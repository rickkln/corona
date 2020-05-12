import React from 'react';
import {
  useTable, useSortBy, Row, IdType, Column, TableState,
} from 'react-table';
import styles from './tables.module.css';
import Table from './table';
import { Period, Country } from '../../../utilities/types/data';
import { getCSSClassFor, getPeriodNames } from '../../../utilities/periodUtils';
import OutbreakStatus from '../../../utilities/types/OutbreakStatus';

const formatCell = (period: Period) => {
  const className = getCSSClassFor(period?.status);
  if (
    period
    && (period.status === OutbreakStatus.None
      || period.status === OutbreakStatus.Small
      || !Number.isFinite(period.growthRate)
      || Number.isNaN(period.growthRate))
  ) {
    return { value: period.status, className };
  }
  return { value: `${period?.growthRate.toString()}%`, className };
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
) => stickyGlobal(
  rowA,
  desc,
  rowA.values[columnId].name - rowB.values[columnId].name,
);

const totalCasesSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(
  rowA,
  desc,
  rowA.values[columnId].totalCases - rowB.values[columnId].totalCases,
);

const newCasesSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(
  rowA,
  desc,
  rowA.values[columnId].newCases - rowB.values[columnId].newCases,
);

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
) => stickyGlobal(
  rowA,
  desc,
  rowA.values[columnId].newDeaths - rowB.values[columnId].newDeaths,
);

const growthSort = (
  rowA: Row,
  rowB: Row,
  columnId: IdType<String>,
  desc: boolean,
) => stickyGlobal(
  rowA,
  desc,
  rowA.values[columnId].growthRate - rowB.values[columnId].growthRate,
);

export const TotalCasesTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
        sortType: nameSort,
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalCasesSort,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalCasesSort,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalCasesSort,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalCasesSort,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalCasesSort,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalCasesSort,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'periods[0]', desc: true }],
    }),
    [],
  ) as Partial<TableState<Country>>;

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className={styles.fullTable}>
      <Table table={table} />
    </div>
  );
};

export const NewCasesTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
        sortType: nameSort,
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newCasesSort,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newCasesSort,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newCasesSort,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newCasesSort,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newCasesSort,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newCasesSort,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'periods[0]', desc: true }],
    }),
    [],
  ) as Partial<TableState<Country>>;

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className={styles.fullTable}>
      <Table table={table} />
    </div>
  );
};

export const TotalDeathsTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
        sortType: nameSort,
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalDeathsSort,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalDeathsSort,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalDeathsSort,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalDeathsSort,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalDeathsSort,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: totalDeathsSort,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'periods[0]', desc: true }],
    }),
    [],
  ) as Partial<TableState<Country>>;

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className={styles.fullTable}>
      <Table table={table} />
    </div>
  );
};

export const NewDeathsTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
        sortType: nameSort,
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newDeathsSort,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newDeathsSort,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newDeathsSort,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newDeathsSort,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newDeathsSort,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
        getClassName: (period: Period) => formatCell(period).className,
        sortType: newDeathsSort,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'periods[0]', desc: true }],
    }),
    [],
  ) as Partial<TableState<Country>>;

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className={styles.fullTable}>
      <Table table={table} />
    </div>
  );
};

export const GrowthTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
        sortType: nameSort,
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
        sortType: growthSort,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
        sortType: growthSort,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
        sortType: growthSort,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
        sortType: growthSort,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
        sortType: growthSort,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => formatCell(value).value,
        getClassName: (period: Period) => formatCell(period).className,
        sortType: growthSort,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'periods[0]', desc: true }],
    }),
    [],
  ) as Partial<TableState<Country>>;

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div className={styles.fullTable}>
      <Table table={table} />
    </div>
  );
};

export const GrowthSummaryTable = ({
  data,
  periodLength,
  desc = true,
}: {
  data: Country[],
  periodLength: number,
  desc?: boolean,
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(() => {
    const country = data.length > 1
      ? [
        {
          Header: 'Country',
          accessor: 'name',
          sortType: nameSort,
        },
      ]
      : [];
    return [
      ...country,
      ...[
        {
          Header: periodNames[2],
          accessor: 'periods[2]',
          Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) ?? '',
          getClassName: (period: Period) => formatCell(period).className,
          sortType: newDeathsSort,
        },
        {
          Header: periodNames[1],
          accessor: 'periods[1]',
          Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) ?? '',
          getClassName: (period: Period) => formatCell(period).className,
          sortType: newDeathsSort,
        },
        {
          Header: periodNames[0],
          accessor: 'periods[0]',
          Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) ?? '',
          getClassName: (period: Period) => formatCell(period).className,
          sortType: newDeathsSort,
        },
      ],
    ];
  }, [data.length, periodNames]) as Array<Column<Country>>;

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'periods[0]', desc }],
    }),
    [],
  ) as Partial<TableState<Country>>;

  const table = useTable({ columns, data, initialState }, useSortBy);

  return (
    <div
      className={data.length === 1
        ? styles.tinyTable
        : ''}
    >
      <Table table={table} />
    </div>
  );
};
