import { gql } from '@apollo/client';

export const getCountries = gql`
  query {
    countries {
      name
      results {
        date
        deaths
      }
    }
  }
`;

export interface Countries {
  countries?: Country[];
}

interface Country {
  name?: string
  results?: Result[]
  deathCounts?: number[]
  growthRates?: number[]
}

interface Result {
  date?: string
  deaths?: number
}

export const calculateGrowthData = (data: Countries | undefined) => {
  if (!data) { return []; }
  return data?.countries?.map((country) => {
    const deathCounts: number[] = Array(7);
    country?.results?.forEach((result) => {
      if (!result?.date) { return; }
      const millisecondsAgo = new Date().valueOf() - new Date(result?.date).valueOf();
      const daysAgo = Math.floor((millisecondsAgo) / (1000 * 60 * 60 * 24));
      // We're looking at six 5-day periods over the last month
      // We include one extra preceeding period for calculations
      // We ignore today as it has incomplete data
      if (daysAgo <= 35 && daysAgo >= 1) {
        deathCounts[Math.round(daysAgo / 5) - 1] = result?.deaths ?? 0;
      }
    });
    const growthRates = deathCounts
      .map((current, index, array) => {
        if (index < array.length) {
          const previous = deathCounts[index + 1];
          const newDeaths = current - previous;
          const growthRate = (newDeaths / previous) * 100;
          return Math.round(growthRate * 100) / 100;
        }
        // In this case this is the last period which we just needed
        // to calculate the penultimate one, we will slice it off below
        return 0;
      })
      .slice(0, -1);
    return {
      ...country,
      deathCounts,
      growthRates,
    };
  });
};
