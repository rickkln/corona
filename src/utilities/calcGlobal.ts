import { getPeriodName, getPeriodCount, validatePeriodLength } from './periodUtils';
import { Country, PeriodSummary } from './types/data';
import { calulatePeriodData } from './calcAllData';
import OutbreakStatus from './types/OutbreakStatus';

export const sumPeriodData = (countries: Country[], periodLength: number): Country[] => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodCount = getPeriodCount(validPeriodLength);
  const counts = countries.reduce(
    (global, country) => global.map(
      (currentPeriodTotals, index) => ({
        deaths: currentPeriodTotals.deaths + country.periods[index].totalDeaths,
        cases: currentPeriodTotals.cases + country.periods[index].totalCases,
      }),
    ),
    Array.from(
      { length: periodCount },
      () => ({
        deaths: 0,
        cases: 0,
      }),
    ),
  );
  const allPeriods = calulatePeriodData(counts, validPeriodLength);
  return [{
    name: 'Global',
    results: [],
    periods: allPeriods.periods,
    periodsWithDeaths: allPeriods.periodsWithDeaths,
  }];
};

export const calculateGlobalSummary = (
  countries: Country[],
  periodLength: number,
): PeriodSummary[] => {
  const validPeriodLength = validatePeriodLength(periodLength);
  const periodCount = getPeriodCount(validPeriodLength);
  const initialPeriodSummaries: PeriodSummary[] = Array.from(
    { length: periodCount - 2 },
    (_value, index) => ({
      endDate: getPeriodName(1 + index * validPeriodLength),
      none: 0,
      small: 0,
      losing: 0,
      flattening: 0,
      crushing: 0,
      winning: 0,
      won: 0,
      pandemicFree: 0,
      underControl: 0,
    }),
  );
  const periodSummaries = countries.reduce(
    (globalPeriods, country) => globalPeriods.reduce(
      (globalPeriodsInner, _currentPeriod, periodIndex) => {
        const newGlobalPeriods = globalPeriodsInner;
        if (country.periods[periodIndex].status === OutbreakStatus.None) {
          newGlobalPeriods[periodIndex].none += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Small) {
          newGlobalPeriods[periodIndex].small += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Losing) {
          newGlobalPeriods[periodIndex].losing += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Flattening) {
          newGlobalPeriods[periodIndex].flattening += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Crushing) {
          newGlobalPeriods[periodIndex].crushing += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Winning) {
          newGlobalPeriods[periodIndex].winning += 1;
        } else if (country.periods[periodIndex].status === OutbreakStatus.Won) {
          newGlobalPeriods[periodIndex].won += 1;
        }
        if (
          country.periods[periodIndex].newDeaths === 0
          && country.periods[periodIndex].newCases === 0
        ) {
          newGlobalPeriods[periodIndex].pandemicFree += ((1 / 186) * 100);
        }
        if (
          country.periods[periodIndex].status === OutbreakStatus.None
          || country.periods[periodIndex].status === OutbreakStatus.Small
          || country.periods[periodIndex].status === OutbreakStatus.Crushing
          || country.periods[periodIndex].status === OutbreakStatus.Winning
          || country.periods[periodIndex].status === OutbreakStatus.Won
        ) {
          newGlobalPeriods[periodIndex].underControl += ((1 / 186) * 100);
        }
        return newGlobalPeriods;
      },
      globalPeriods,
    ),
    initialPeriodSummaries,
  );
  periodSummaries.reverse();
  return periodSummaries;
};
