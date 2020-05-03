import { Tag } from 'react-tag-autocomplete';
import OutbreakStatus from './types/OutbreakStatus';
import { Country } from './types/data';

export const PERIOD_LENGTH = 5;

export const getDaysAgo = (date: Date): number => {
  const millisecondsAgo = new Date().valueOf() - new Date(date).valueOf();
  return Math.floor((millisecondsAgo) / (1000 * 60 * 60 * 24));
};

export const getPeriodCount = (
  periodLength: number,
) => Math.floor(getDaysAgo(new Date('2020/01/07')) / periodLength);

export const periodStatus = (
  totalDeaths: number,
  currentNewDeaths: number,
  previousNewDeaths: number,
  growthRate: number,
): OutbreakStatus | undefined => {
  if (totalDeaths === 0) {
    return OutbreakStatus.None;
  } if (totalDeaths < 10) {
    return OutbreakStatus.Small;
  } if ((growthRate >= 100 && Number.isFinite(growthRate)) || currentNewDeaths >= 1000) {
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
