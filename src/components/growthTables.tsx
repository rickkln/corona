import React from 'react';
import { useTable, useSortBy } from 'react-table';
import Table from './table';
import {
  getPeriodName, Country, Period, OutbreakStatus,
} from '../utilities/getData';

const formatCell = (period: Period) => {
  const growthValue = `${period.growthRate.toString()}%`;
  if (period.status === OutbreakStatus.None) {
    return { value: 'No Outbreak', className: 'none' };
  } if (period.status === OutbreakStatus.Starting) {
    return { value: 'Outbreak Starting', className: 'starting' };
  } if (period.status === OutbreakStatus.Losing) {
    return { value: growthValue, className: 'losing' };
  } if (period.status === OutbreakStatus.Flattening) {
    return { value: growthValue, className: 'flattening' };
  } if (period.status === OutbreakStatus.Crushing) {
    return { value: growthValue, className: 'crushing' };
  } if (period.status === OutbreakStatus.Winning) {
    return { value: growthValue, className: 'winning' };
  } if (period.status === OutbreakStatus.Won) {
    return { value: 'Outbreak Defeated', className: 'won' };
  }
  return { value: '', className: '' };
};

export const SummaryTable = ({ data }: { data: Period[][] }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: getPeriodName(15),
        accessor: '2',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
      },
      {
        Header: getPeriodName(10),
        accessor: '1',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
      },
      {
        Header: getPeriodName(5),
        accessor: '0',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
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
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
      },
      {
        Header: getPeriodName(25),
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
      },
      {
        Header: getPeriodName(20),
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
      },
      {
        Header: getPeriodName(15),
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
      },
      {
        Header: getPeriodName(10),
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
      },
      {
        Header: getPeriodName(5),
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
      },
    ],
    [],
  );
  const initialState = {
    sortBy: [{ id: 'name' }],
  };
  const table = useTable({ columns, data, initialState }, useSortBy);
  return <Table table={table} />;
};
