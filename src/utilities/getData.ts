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
  None = 'No Outbreak',
  Small = 'Small Outbreak',
  Losing = 'Losing',
  Flattening = 'Flattening the Curve',
  Crushing = 'Crushing the Curve',
  Winning = 'Winning',
  Won = 'Won',
}

export interface Period {
  totalDeaths: number
  newDeaths: number
  growthRate: number
  status: OutbreakStatus | undefined
}

export interface GlobalSummary {
  succeeding: number
  struggling: number
  small: number
  none: number
}

const periodStatus = (
  totalDeaths: number,
  currentNewDeaths: number,
  previousNewDeaths: number,
  growthRate: number,
): OutbreakStatus | undefined => {
  if (totalDeaths === 0) {
    return OutbreakStatus.None;
  } if (totalDeaths < 10 || !Number.isFinite(growthRate)) {
    return OutbreakStatus.Small;
  } if (growthRate >= 100) {
    return OutbreakStatus.Losing;
  } if (growthRate > 0 || currentNewDeaths >= 100) {
    return OutbreakStatus.Flattening;
  } if ((currentNewDeaths >= 10 && currentNewDeaths < 100) || growthRate < -50) {
    return OutbreakStatus.Crushing;
  } if (currentNewDeaths === 0 && previousNewDeaths === 0) {
    return OutbreakStatus.Won;
  } if (currentNewDeaths < 10) {
    return OutbreakStatus.Winning;
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

const calulatePeriodData = (deathCounts: number[]): Period[] => deathCounts
  .map((currentDeathCount, index, array) => {
    if (index < (array.length - 1)) {
      const previousNewDeaths = deathCounts[index + 1] - deathCounts[index + 2];
      const currentNewDeaths = currentDeathCount - deathCounts[index + 1];
      const growthRate = ((currentNewDeaths - previousNewDeaths) / previousNewDeaths) * 100;
      const currentStatus = periodStatus(
        currentDeathCount,
        currentNewDeaths,
        previousNewDeaths,
        growthRate,
      );
      return {
        totalDeaths: currentDeathCount,
        newDeaths: currentNewDeaths,
        status: currentStatus,
        growthRate:
          (currentStatus !== OutbreakStatus.None) && (currentStatus !== OutbreakStatus.Small)
            ? Math.round(growthRate * 100) / 100
            : 0,
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

export const sumPeriodData = (countries: Country[]): Country[] => {
  const deathCounts = countries.reduce(
    (global, country) => global.map(
      (totalDeaths, index) => totalDeaths + country.periods[index].totalDeaths,
    ),
    Array(8).fill(0),
  );
  return [{
    name: '',
    results: [],
    periods: calulatePeriodData(deathCounts),
  }];
};

export const calculateGlobalSummary = (countries: Country[]): GlobalSummary => {
  const globalSummary = countries.reduce(
    (global, country) => {
      if (
        country.periods[0].status === OutbreakStatus.Crushing
        || country.periods[0].status === OutbreakStatus.Winning
        || country.periods[0].status === OutbreakStatus.Won
      ) {
        return { ...global, succeeding: global.succeeding + 1 };
      } if (
        country.periods[0].status === OutbreakStatus.Losing
        || country.periods[0].status === OutbreakStatus.Flattening
      ) {
        return { ...global, struggling: global.struggling + 1 };
      } if (country.periods[0].status === OutbreakStatus.Small) {
        return { ...global, small: global.small + 1 };
      } if (
        country.periods[0].status === OutbreakStatus.None) {
        return { ...global, none: global.none + 1 };
      }
      return global;
    },
    {
      succeeding: 0,
      struggling: 0,
      small: 0,
      none: 0,
    },
  );
  return globalSummary;
};
