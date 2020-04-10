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
  deathCounts: number[]
  growthRates: number[]
}

interface Result {
  date?: string
  deaths?: number
}

export const getPeriodName = (startingDaysAgo: number) => {
  const startDate = new Date(new Date().setDate(new Date().getDate() - startingDaysAgo));
  const endDate = new Date(new Date().setDate(new Date().getDate() - startingDaysAgo + 4));
  return `${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}`;
};

const calulateGrowthRates = (deathCounts: number[]) => deathCounts
  .map((currentDeathCount, index, array) => {
    if (index < (array.length - 1)) {
      const previousNewDeaths = deathCounts[index + 1] - deathCounts[index + 2];
      const currentNewDeaths = currentDeathCount - deathCounts[index + 1];
      const growthRate = ((currentNewDeaths - previousNewDeaths) / previousNewDeaths) * 100;
      return Math.round(growthRate * 100) / 100;
    }
    // In this case this is one of the last 2 periods which we just needed
    // to calculate the last one, we will slice them off below
    return 0;
  })
  .slice(0, -2);

export const calculateGrowthData = (data: Countries | undefined): Country[] => {
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
    const growthRates = calulateGrowthRates(deathCounts);
    return {
      ...country,
      deathCounts,
      growthRates,
    };
  });
};

export const sumGrowthData = (countries: Country[]) => {
  const deathCounts = countries.reduce(
    (global, country) => global.map((count, index) => (
      count + country.deathCounts[index]
    )),
    Array(8).fill(0),
  );
  return calulateGrowthRates(deathCounts);
};
