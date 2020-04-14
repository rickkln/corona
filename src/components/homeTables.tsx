import React from 'react';
import { useTable } from 'react-table';
import Table from './table';
import { getPeriodName, Country, Period } from '../utilities/getData';

const formatCell = (period: Period): String => {
  if (Number.isNaN(period.growthRate)) {
    return 'No deaths';
  } if (!Number.isFinite(period.growthRate)) {
    return 'Deaths start';
  }
  return `${period.growthRate.toString()}%`;
};

export const SummaryTable = ({ data }: { data: Period[][] }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: getPeriodName(15),
        accessor: (row: Period[]) => formatCell(row[2]),
      },
      {
        Header: getPeriodName(10),
        accessor: (row: Period[]) => formatCell(row[1]),
      },
      {
        Header: getPeriodName(5),
        accessor: (row: Period[]) => formatCell(row[0]),
      },
    ],
    [],
  );
  const table = useTable({ columns, data });
  return <Table table={table} />;
};

export const FullTable = ({ data }: { data: Country[] }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: getPeriodName(30),
        accessor: (row: Country) => formatCell(row.periods[5]),
      },
      {
        Header: getPeriodName(25),
        accessor: (row: Country) => formatCell(row.periods[4]),
      },
      {
        Header: getPeriodName(20),
        accessor: (row: Country) => formatCell(row.periods[3]),
      },
      {
        Header: getPeriodName(15),
        accessor: (row: Country) => formatCell(row.periods[2]),
      },
      {
        Header: getPeriodName(10),
        accessor: (row: Country) => formatCell(row.periods[1]),
      },
      {
        Header: getPeriodName(5),
        accessor: (row: Country) => formatCell(row.periods[0]),
      },
    ],
    [],
  );
  const table = useTable({ columns, data });
  return <Table table={table} />;
};
