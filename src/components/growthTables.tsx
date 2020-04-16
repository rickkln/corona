import React from 'react';
import {
  useTable, useSortBy, Row, IdType,
} from 'react-table';
import styles from './growthTables.module.css';
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

const periodSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
) => rowA.values[columnId].growthRate - rowB.values[columnId].growthRate;

export const SummaryTable = ({ data }: { data: Country[] }) => {
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

export const FullTable = ({ data }: { data: Country[] }) => {
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
      sortType: periodSort,
    },
    {
      Header: getPeriodName(21),
      accessor: 'periods[4]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: periodSort,
    },
    {
      Header: getPeriodName(16),
      accessor: 'periods[3]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: periodSort,
    },
    {
      Header: getPeriodName(11),
      accessor: 'periods[2]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: periodSort,
    },
    {
      Header: getPeriodName(6),
      accessor: 'periods[1]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: periodSort,
    },
    {
      Header: getPeriodName(1),
      accessor: 'periods[0]',
      Cell: ({ value }: { value: Period }) => formatCell(value).value,
      getClassName: (period: Period) => formatCell(period).className,
      sortType: periodSort,
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
