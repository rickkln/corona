import React from 'react';
import {
  useTable, useSortBy, Row, IdType,
} from 'react-table';
import styles from './tables.module.css';
import Table from './table';
import { Period, Country } from '../../../utilities/types/data';
import { getCSSClassFor, getPeriodName } from '../../../utilities/periodUtils';
import OutbreakStatus from '../../../utilities/types/OutbreakStatus';

const formatCell = (period: Period) => {
  const className = getCSSClassFor(period.status);
  if (
    period.status === OutbreakStatus.None
    || period.status === OutbreakStatus.Small
    || !Number.isFinite(period.growthRate)
    || Number.isNaN(period.growthRate)
  ) {
    return { value: period.status, className };
  }
  return { value: `${period.growthRate.toString()}%`, className };
};

const stickyGlobal = (row: Row, desc: boolean, value: number) => {
  const global = desc
    ? 1
    : -1;
  return row.values.name === 'Global'
    ? global
    : value;
};

const nameSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(rowA, desc, rowA.values[columnId].name - rowB.values[columnId].name);

const totalCasesSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(rowA, desc, rowA.values[columnId].totalCases - rowB.values[columnId].totalCases);

const newCasesSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(rowA, desc, rowA.values[columnId].newCases - rowB.values[columnId].newCases);

const totalDeathsSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(
  rowA,
  desc,
  rowA.values[columnId].totalDeaths - rowB.values[columnId].totalDeaths,
);

const newDeathsSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(rowA, desc, rowA.values[columnId].newDeaths - rowB.values[columnId].newDeaths);

const growthSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(rowA, desc, rowA.values[columnId].growthRate - rowB.values[columnId].growthRate);

export const TotalCasesTable = ({ data }: { data: Country[] }) => {
  const columns = React.useMemo(() => [
    {
      Header: 'Country',
      accessor: 'name',
      sortType: nameSort,
    },
    {
      Header: getPeriodName(26),
      accessor: 'periods[5]',
      Cell: ({ value }: { value: Period }) => value.totalCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalCasesSort,
    },
    {
      Header: getPeriodName(21),
      accessor: 'periods[4]',
      Cell: ({ value }: { value: Period }) => value.totalCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalCasesSort,
    },
    {
      Header: getPeriodName(16),
      accessor: 'periods[3]',
      Cell: ({ value }: { value: Period }) => value.totalCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalCasesSort,
    },
    {
      Header: getPeriodName(11),
      accessor: 'periods[2]',
      Cell: ({ value }: { value: Period }) => value.totalCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalCasesSort,
    },
    {
      Header: getPeriodName(6),
      accessor: 'periods[1]',
      Cell: ({ value }: { value: Period }) => value.totalCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalCasesSort,
    },
    {
      Header: getPeriodName(1),
      accessor: 'periods[0]',
      Cell: ({ value }: { value: Period }) => value.totalCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalCasesSort,
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

export const NewCasesTable = ({ data }: { data: Country[] }) => {
  const columns = React.useMemo(() => [
    {
      Header: 'Country',
      accessor: 'name',
      sortType: nameSort,
    },
    {
      Header: getPeriodName(26),
      accessor: 'periods[5]',
      Cell: ({ value }: { value: Period }) => value.newCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newCasesSort,
    },
    {
      Header: getPeriodName(21),
      accessor: 'periods[4]',
      Cell: ({ value }: { value: Period }) => value.newCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newCasesSort,
    },
    {
      Header: getPeriodName(16),
      accessor: 'periods[3]',
      Cell: ({ value }: { value: Period }) => value.newCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newCasesSort,
    },
    {
      Header: getPeriodName(11),
      accessor: 'periods[2]',
      Cell: ({ value }: { value: Period }) => value.newCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newCasesSort,
    },
    {
      Header: getPeriodName(6),
      accessor: 'periods[1]',
      Cell: ({ value }: { value: Period }) => value.newCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newCasesSort,
    },
    {
      Header: getPeriodName(1),
      accessor: 'periods[0]',
      Cell: ({ value }: { value: Period }) => value.newCases
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newCasesSort,
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

export const TotalDeathsTable = ({ data }: { data: Country[] }) => {
  const columns = React.useMemo(() => [
    {
      Header: 'Country',
      accessor: 'name',
      sortType: nameSort,
    },
    {
      Header: getPeriodName(26),
      accessor: 'periods[5]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(21),
      accessor: 'periods[4]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(16),
      accessor: 'periods[3]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(11),
      accessor: 'periods[2]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(6),
      accessor: 'periods[1]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: totalDeathsSort,
    },
    {
      Header: getPeriodName(1),
      accessor: 'periods[0]',
      Cell: ({ value }: { value: Period }) => value.totalDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
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
      sortType: nameSort,
    },
    {
      Header: getPeriodName(26),
      accessor: 'periods[5]',
      Cell: ({ value }: { value: Period }) => value.newDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(21),
      accessor: 'periods[4]',
      Cell: ({ value }: { value: Period }) => value.newDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(16),
      accessor: 'periods[3]',
      Cell: ({ value }: { value: Period }) => value.newDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(11),
      accessor: 'periods[2]',
      Cell: ({ value }: { value: Period }) => value.newDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(6),
      accessor: 'periods[1]',
      Cell: ({ value }: { value: Period }) => value.newDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      getClassName: (period: Period) => formatCell(period).className,
      sortType: newDeathsSort,
    },
    {
      Header: getPeriodName(1),
      accessor: 'periods[0]',
      Cell: ({ value }: { value: Period }) => value.newDeaths
        .toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
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
      sortType: nameSort,
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
          sortType: nameSort,
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
