import {
  Counts, Periods, Period, Countries, Country,
} from './types/data';
import {
  periodStatus, getPeriodName, getPeriodCount, getDaysAgo, validatePeriodLength,
} from './periodUtils';
import OutbreakStatus from './types/OutbreakStatus';

export const calulatePeriodData = (counts: Counts[], periodLength: number): Periods => {
  const validPeriodLength = validatePeriodLength(periodLength);
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
        endDate: getPeriodName(1 + index * validPeriodLength),
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

export const calculateData = (data: Countries | undefined, periodLength: number): Country[] => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodCount = getPeriodCount(validPeriodLength);
  if (!data?.countries) { return []; }
  const countries: Country[] = [];
  data?.countries?.forEach((country) => {
    const counts: Counts[] = Array.from(
      { length: periodCount },
      () => ({
        deaths: 0,
        cases: 0,
      }),
    );
    country?.results?.forEach((result) => {
      if (!result?.date) { return; }
      const daysAgo = getDaysAgo(new Date(result?.date));
      // We're looking at an amount of periods defined by PERIOD_COUNT
      // each with an amount of days defined by validPeriodLength
      // We ignore today as it has incomplete data
      if (daysAgo <= (periodCount * validPeriodLength) && daysAgo >= 1) {
        counts[Math.round(daysAgo / validPeriodLength) - 1] = {
          deaths: result?.deaths ?? 0,
          cases: result?.confirmed ?? 0,
        };
      }
    });
    const allPeriods = calulatePeriodData(counts, periodLength);
    if (country.name !== 'Diamond Princess') {
      countries.push({
        ...country,
        name: country.name === 'US'
          ? 'United States'
          : country.name,
        periods: allPeriods.periods,
        periodsWithDeaths: allPeriods.periodsWithDeaths,
      });
    }
  });
  return countries;
};
