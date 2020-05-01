import { gql } from '@apollo/client';
import { Tag } from 'react-tag-autocomplete';

export const countryQuery = gql`
  query {
    countries {
      name
      results {
        date(format: "yyyy/MM/dd")
        deaths
        confirmed
      }
    }
  }
`;

const getDaysAgo = (date: Date): number => {
  const millisecondsAgo = new Date().valueOf() - new Date(date).valueOf();
  return Math.floor((millisecondsAgo) / (1000 * 60 * 60 * 24));
};

const PERIOD_LENGTH = 5;
const PERIOD_COUNT = Math.floor(getDaysAgo(new Date('2020/01/07')) / PERIOD_LENGTH);

export interface Countries {
  countries?: Country[];
}

export interface Country {
  name?: string
  results?: Result[]
  periods: Period[]
  periodsWithDeaths: Period[]
}

interface Result {
  date?: string
  deaths?: number
  confirmed?: number
}

interface Counts {
  deaths: number
  cases: number
}

export enum OutbreakStatus {
  None = 'No Outbreak',
  Small = 'Small Outbreak',
  Losing = 'Losing',
  Flattening = 'Flattening the Curve',
  Crushing = 'Crushing the Curve',
  Winning = 'Winning',
  Won = 'Won',
}

interface Periods {
  periods: Period[]
  periodsWithDeaths: Period[]
}

export interface Period {
  endDate: string
  totalDeaths: number
  newDeaths: number
  growthRate: number
  totalCases: number
  newCases: number
  status: OutbreakStatus | undefined
}

export interface PeriodSummary {
  endDate: string
  none: number
  small: number
  losing: number
  flattening: number
  crushing: number
  winning: number
  won: number
}

const periodStatus = (
  totalDeaths: number,
  currentNewDeaths: number,
  previousNewDeaths: number,
  growthRate: number,
): OutbreakStatus | undefined => {
  if (totalDeaths === 0) {
    return OutbreakStatus.None;
  } if (totalDeaths < 10) {
    return OutbreakStatus.Small;
  } if (growthRate >= 100 && Number.isFinite(growthRate)) {
    return OutbreakStatus.Losing;
  } if ((growthRate > 0 && Number.isFinite(growthRate)) || currentNewDeaths >= 100) {
    return OutbreakStatus.Flattening;
  } if (currentNewDeaths === 0 && previousNewDeaths === 0) {
    return OutbreakStatus.Won;
  } if (currentNewDeaths < 10) {
    return OutbreakStatus.Winning;
  } if ((currentNewDeaths >= 10 && currentNewDeaths < 100) || growthRate < -50) {
    return OutbreakStatus.Crushing;
  }
  return undefined;
};

export const getCSSClassFor = (status: OutbreakStatus | undefined) => {
  if (status === OutbreakStatus.None) {
    return 'none';
  } if (status === OutbreakStatus.Small) {
    return 'small';
  } if (status === OutbreakStatus.Losing) {
    return 'losing';
  } if (status === OutbreakStatus.Flattening) {
    return 'flattening';
  } if (status === OutbreakStatus.Crushing) {
    return 'crushing';
  } if (status === OutbreakStatus.Winning) {
    return 'winning';
  } if (status === OutbreakStatus.Won) {
    return 'won';
  }
  return '';
};

export const getPeriodName = (endingDaysAgo: number) => {
  const endDate = new Date(new Date().setDate(new Date().getDate() - endingDaysAgo));
  return `${endDate.getDate()}/${endDate.getMonth() + 1}`;
};

export const getTags = (countries: Country[]): Tag[] => countries.map((country) => ({
  id: country.name ?? '',
  name: country.name ?? '',
}));

const calulatePeriodData = (counts: Counts[]): Periods => {
  const periodsWithDeaths: Period[] = [];
  const periods = counts.map((currentCounts, index, array) => {
    if (index < (array.length - 2)) {
      const previousNewDeaths = counts[index + 1].deaths - counts[index + 2].deaths;
      const currentNewDeaths = currentCounts.deaths - counts[index + 1].deaths;
      const growthRate = ((currentNewDeaths - previousNewDeaths) / previousNewDeaths) * 100;
      const currentNewCases = currentCounts.cases - counts[index + 1].cases;
      const currentStatus = periodStatus(
        currentCounts.deaths,
        currentNewDeaths,
        previousNewDeaths,
        growthRate,
      );
      const period = {
        endDate: getPeriodName(1 + index * PERIOD_LENGTH),
        totalDeaths: currentCounts.deaths,
        newDeaths: currentNewDeaths,
        status: currentStatus,
        totalCases: currentCounts.cases,
        newCases: currentNewCases,
        growthRate:
          (Number.isFinite(growthRate) && !Number.isNaN(growthRate))
            ? Math.round(growthRate * 100) / 100
            : 0,
      };
      if (currentCounts.deaths > 0) {
        periodsWithDeaths.push(period);
      }
      return period;
    }
    // In this case this is one of the 2 periods periods which we just needed
    // to calculate the last relevant period
    return {
      endDate: '',
      totalDeaths: 0,
      newDeaths: 0,
      growthRate: 0,
      totalCases: 0,
      newCases: 0,
      status: OutbreakStatus.None,
    };
  });
  return {
    periodsWithDeaths,
    periods,
  };
};
// TODO: Slice off the last two invalid items without affecting global summary calculation

export const calculateData = (data: Countries | undefined): Country[] => {
  if (!data?.countries) { return []; }
  return data?.countries?.map((country) => {
    const counts: Counts[] = Array.from(
      { length: PERIOD_COUNT },
      () => ({
        deaths: 0,
        cases: 0,
      }),
    );
    country?.results?.forEach((result) => {
      if (!result?.date) { return; }
      const daysAgo = getDaysAgo(new Date(result?.date));
      // We're looking at an amount of periods defined by PERIOD_COUNT
      // each with an amount of days defined by PERIOD_LENGTH
      // We ignore today as it has incomplete data
      if (daysAgo <= (PERIOD_COUNT * PERIOD_LENGTH) && daysAgo >= 1) {
        counts[Math.round(daysAgo / PERIOD_LENGTH) - 1] = {
          deaths: result?.deaths ?? 0,
          cases: result?.confirmed ?? 0,
        };
      }
    });
    const allPeriods = calulatePeriodData(counts);
    return {
      ...country,
      periods: allPeriods.periods,
      periodsWithDeaths: allPeriods.periodsWithDeaths,
    };
  });
};

export const sumPeriodData = (countries: Country[]): Country[] => {
  const counts = countries.reduce(
    (global, country) => global.map(
      (currentPeriodTotals, index) => ({
        deaths: currentPeriodTotals.deaths + country.periods[index].totalDeaths,
        cases: currentPeriodTotals.cases + country.periods[index].totalCases,
      }),
    ),
    Array.from(
      { length: PERIOD_COUNT },
      () => ({
        deaths: 0,
        cases: 0,
      }),
    ),
  );
  const allPeriods = calulatePeriodData(counts);
  return [{
    name: 'Global',
    results: [],
    periods: allPeriods.periods,
    periodsWithDeaths: allPeriods.periodsWithDeaths,
  }];
};

export const calculateGlobalSummary = (countries: Country[]): PeriodSummary[] => {
  const initialPeriodSummaries: PeriodSummary[] = Array.from(
    { length: PERIOD_COUNT - 2 },
    (_value, index) => ({
      endDate: getPeriodName(1 + index * PERIOD_LENGTH),
      none: 0,
      small: 0,
      losing: 0,
      flattening: 0,
      crushing: 0,
      winning: 0,
      won: 0,
    }),
  );
  const periodSummaries = countries.reduce(
    (globalPeriods, country) => globalPeriods.reduce(
      (globalPeriodsInner, _currentPeriod, periodIndex) => {
        const newGlobalPeriods = globalPeriodsInner;
        if (country.periods[periodIndex].status === OutbreakStatus.None) {
          newGlobalPeriods[periodIndex].none += 1;
        } if (country.periods[periodIndex].status === OutbreakStatus.Small) {
          newGlobalPeriods[periodIndex].small += 1;
        } if (country.periods[periodIndex].status === OutbreakStatus.Losing) {
          newGlobalPeriods[periodIndex].losing += 1;
        } if (country.periods[periodIndex].status === OutbreakStatus.Flattening) {
          newGlobalPeriods[periodIndex].flattening += 1;
        } if (country.periods[periodIndex].status === OutbreakStatus.Crushing) {
          newGlobalPeriods[periodIndex].crushing += 1;
        } if (country.periods[periodIndex].status === OutbreakStatus.Winning) {
          newGlobalPeriods[periodIndex].winning += 1;
        } if (country.periods[periodIndex].status === OutbreakStatus.Won) {
          newGlobalPeriods[periodIndex].won += 1;
        }
        return newGlobalPeriods;
      },
      globalPeriods,
    ),
    initialPeriodSummaries,
  );
  periodSummaries.reverse();
  return periodSummaries.slice(60 / PERIOD_LENGTH); // Cut off first 60 days for summary
};
