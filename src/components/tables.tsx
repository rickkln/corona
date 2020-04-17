import React from 'react';
import {
  useTable, useSortBy, Row, IdType,
} from 'react-table';
import styles from './tables.module.css';
import Table from './table';
import {
  Country, Period, OutbreakStatus, getCSSClassFor,
} from '../utilities/getData';

const getPeriodName = (endingDaysAgo: number) => {
  const endDate = new Date(new Date().setDate(new Date().getDate() - endingDaysAgo));
  return `${endDate.getDate()}/${endDate.getMonth() + 1}`;
};

const formatCell = (period: Period) => {
  const className = getCSSClassFor(period.status);
  if (
    period.status === OutbreakStatus.None
    || period.status === OutbreakStatus.Small
    || period.status === OutbreakStatus.Won
  ) {
    return { value: period.status, className };
  }
  return { value: `${period.growthRate.toString()}%`, className };
};

const totalDeathsSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
) => rowA.values[columnId].totalDeaths - rowB.values[columnId].totalDeaths;

const newDeathsSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
) => rowA.values[columnId].newDeaths - rowB.values[columnId].newDeaths;

const growthSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
) => rowA.values[columnId].growthRate - rowB.values[columnId].growthRate;

export const TotalDeathsTable = ({ data }: { data: Country[] }) => {
  const columns = React.useMemo(() => [
    {
      Header: 'Country',
      accessor: 'name',
    },
    {
      Header: getPeriodName(26),
      accessor: 'periods[5]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(21),
      accessor: 'periods[4]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(16),
      accessor: 'periods[3]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(11),
      accessor: 'periods[2]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(6),
      accessor: 'periods[1]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(1),
      accessor: 'periods[0]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
  ], []);

  const initialState = React.useMemo(() => ({
    sortBy: [{ id: 'name' }],
  }), []);

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className={styles.fullTable}>
      <Table table={table} />
    </div>
  );
};

export const NewDeathsTable = ({ data }: { data: Country[] }) => {
  const columns = React.useMemo(() => [
    {
      Header: 'Country',
      accessor: 'name',
    },
    {
      Header: getPeriodName(26),
      accessor: 'periods[5]',
      Cell: ({ value }: { value: Period }) => value.newDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(21),
      accessor: 'periods[4]',
      Cell: ({ value }: { value: Period }) => value.newDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(16),
      accessor: 'periods[3]',
      Cell: ({ value }: { value: Period }) => value.newDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(11),
      accessor: 'periods[2]',
      Cell: ({ value }: { value: Period }) => value.newDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(6),
      accessor: 'periods[1]',
      Cell: ({ value }: { value: Period }) => value.newDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(1),
      accessor: 'periods[0]',
      Cell: ({ value }: { value: Period }) => value.newDeaths,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
  ], []);

  const initialState = React.useMemo(() => ({
    sortBy: [{ id: 'name' }],
  }), []);

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className={styles.fullTable}>
      <Table table={table} />
    </div>
  );
};

export const GrowthTable = ({ data }: { data: Country[] }) => {
  const columns = React.useMemo(() => [
    {
      Header: 'Country',
      accessor: 'name',
    },
    {
      Header: getPeriodName(26),
      accessor: 'periods[5]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: growthSort,
    },
    {
      Header: getPeriodName(21),
      accessor: 'periods[4]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: growthSort,
    },
    {
      Header: getPeriodName(16),
      accessor: 'periods[3]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: growthSort,
    },
    {
      Header: getPeriodName(11),
      accessor: 'periods[2]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: growthSort,
    },
    {
      Header: getPeriodName(6),
      accessor: 'periods[1]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: growthSort,
    },
    {
      Header: getPeriodName(1),
      accessor: 'periods[0]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: growthSort,
    },
  ], []);

  const initialState = React.useMemo(() => ({
    sortBy: [{ id: 'name' }],
  }), []);

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className={styles.fullTable}>
      <Table table={table} />
    </div>
  );
};

export const GrowthSummaryTable = ({ data }: { data: Country[] }) => {
  const columns = React.useMemo(
    () => {
      const country = data.length > 1
        ? [{
          Header: 'Country',
          accessor: 'name',
        }]
        : [];
      return [...country, ...[
        {
          Header: getPeriodName(11),
          accessor: 'periods[2]',
          Cell: ({ value }: { value: Period }) => formatCell(value).value,
          getClassName: (period: Period) => formatCell(period).className,
        },
        {
          Header: getPeriodName(6),
          accessor: 'periods[1]',
          Cell: ({ value }: { value: Period }) => formatCell(value).value,
          getClassName: (period: Period) => formatCell(period).className,
        },
        {
          Header: getPeriodName(1),
          accessor: 'periods[0]',
          Cell: ({ value }: { value: Period }) => formatCell(value).value,
          getClassName: (period: Period) => formatCell(period).className,
        },
      ]];
    },
    [data.length],
  );

  const table = useTable({ columns, data });

  return (
    <div
      className={
        data.length === 1
          ? styles.tinyTable
          : ''
      }
    >
      <Table table={table} />
    </div>
  );
};
