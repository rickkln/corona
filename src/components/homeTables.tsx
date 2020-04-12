import React from 'react';
import { useTable } from 'react-table';
import Table from './table';
import { getPeriodName, Country } from '../utilities/getData';

const formatCell = (growthRate: number): String => {
  if (Number.isNaN(growthRate)) {
    return 'No deaths';
  } if (!Number.isFinite(growthRate)) {
    return 'Deaths start';
  }
  return `${growthRate.toString()}%`;
};

export const SummaryTable = ({ data }: { data: number[][] }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: getPeriodName(30),
        accessor: (row: number[]) => formatCell(row[5]),
      },
      {
        Header: getPeriodName(25),
        accessor: (row: number[]) => formatCell(row[4]),
      },
      {
        Header: getPeriodName(20),
        accessor: (row: number[]) => formatCell(row[3]),
      },
      {
        Header: getPeriodName(15),
        accessor: (row: number[]) => formatCell(row[2]),
      },
      {
        Header: getPeriodName(10),
        accessor: (row: number[]) => formatCell(row[1]),
      },
      {
        Header: getPeriodName(5),
        accessor: (row: number[]) => formatCell(row[0]),
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
        accessor: (row: Country) => formatCell(row.growthRates[5]),
      },
      {
        Header: getPeriodName(25),
        accessor: (row: Country) => formatCell(row.growthRates[4]),
      },
      {
        Header: getPeriodName(20),
        accessor: (row: Country) => formatCell(row.growthRates[3]),
      },
      {
        Header: getPeriodName(15),
        accessor: (row: Country) => formatCell(row.growthRates[2]),
      },
      {
        Header: getPeriodName(10),
        accessor: (row: Country) => formatCell(row.growthRates[1]),
      },
      {
        Header: getPeriodName(5),
        accessor: (row: Country) => formatCell(row.growthRates[0]),
      },
    ],
    [],
  );
  const table = useTable({ columns, data });
  return <Table table={table} />;
};
