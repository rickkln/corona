import { gql } from '@apollo/client';

export const countryQuery = gql`
  query {
    countries {
      name
      results {
        date(format: "yyyy/MM/dd")
        deaths
      }
    }
  }
`;

export interface Countries {
  countries?: Country[];
}

export interface Country {
  name?: string
  results?: Result[]
  periods: Period[]
}

interface Result {
  date?: string
  deaths?: number
}

export enum OutbreakStatus {
  None,
  Starting,
  Losing,
  Flattening,
  Crushing,
  Winning,
  Won,
}

export interface Period {
  totalDeaths: number
  newDeaths: number
  growthRate: number
  status: OutbreakStatus | undefined
}

export const getPeriodName = (startingDaysAgo: number) => {
  const startDate = new Date(new Date().setDate(new Date().getDate() - startingDaysAgo));
  const endDate = new Date(new Date().setDate(new Date().getDate() - startingDaysAgo + 4));
  return `${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}`;
};

const periodStatus = (
  totalDeaths: number,
  newDeaths: number,
  growthRate: number,
): OutbreakStatus | undefined => {
  if (totalDeaths === 0) {
    return OutbreakStatus.None;
  } if (totalDeaths < 10 || !Number.isFinite(growthRate)) {
    return OutbreakStatus.Starting;
  } if (growthRate >= 100) {
    return OutbreakStatus.Losing;
  } if (growthRate > 0 || newDeaths > 100) {
    return OutbreakStatus.Flattening;
  } if ((newDeaths > 10 && newDeaths < 100) || growthRate <= -100) {
    return OutbreakStatus.Crushing;
  } if (newDeaths < 10) {
    return OutbreakStatus.Winning;
  } if (newDeaths === 0) {
    return OutbreakStatus.Won;
  }
  return undefined;
};

const calulatePeriodData = (deathCounts: number[]): Period[] => deathCounts
  .map((currentDeathCount, index, array) => {
    if (index < (array.length - 1)) {
      const previousNewDeaths = deathCounts[index + 1] - deathCounts[index + 2];
      const currentNewDeaths = currentDeathCount - deathCounts[index + 1];
      const growthRate = ((currentNewDeaths - previousNewDeaths) / previousNewDeaths) * 100;
      return {
        totalDeaths: currentDeathCount,
        newDeaths: currentNewDeaths,
        status: periodStatus(currentDeathCount, currentNewDeaths, growthRate),
        growthRate: Math.round(growthRate * 100) / 100,
      };
    }
    // In this case this is one of the 2 periods periods which we just needed
    // to calculate the last one
    return {
      totalDeaths: 0,
      newDeaths: 0,
      status: OutbreakStatus.None,
      growthRate: 0,
    };
  });

export const calculateData = (data: Countries | undefined): Country[] => {
  if (!data?.countries) { return []; }
  return data?.countries?.map((country) => {
    const deathCounts: number[] = Array(8).fill(0);
    country?.results?.forEach((result) => {
      if (!result?.date) { return; }
      const millisecondsAgo = new Date().valueOf() - new Date(result?.date).valueOf();
      const daysAgo = Math.floor((millisecondsAgo) / (1000 * 60 * 60 * 24));
      // We're looking at six 5-day periods over the last month
      // We include two extra preceeding period for calculations
      // We ignore today as it has incomplete data
      if (daysAgo <= 40 && daysAgo >= 1) {
        deathCounts[Math.round(daysAgo / 5) - 1] = result?.deaths ?? 0;
      }
    });
    const periods = calulatePeriodData(deathCounts);
    return {
      ...country,
      periods,
    };
  });
};

export const sumPeriodData = (countries: Country[]) => {
  const deathCounts = countries.reduce(
    (global, country) => global.map(
      (totalDeaths, index) => totalDeaths + country.periods[index].totalDeaths,
    ),
    Array(8).fill(0),
  );
  return calulatePeriodData(deathCounts);
};
