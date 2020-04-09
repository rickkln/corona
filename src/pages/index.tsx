import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useTable } from 'react-table';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  Countries, Country, countryQuery, calculateGrowthData, getPeriodName, sumGrowthData,
} from '../utilities/getData';

const formatCell = (growthRate: number): String => {
  if (Number.isNaN(growthRate)) {
    return 'No deaths';
  } if (!Number.isFinite(growthRate)) {
    return 'Deaths start';
  }
  return `${growthRate.toString()}%`;
};

const SummaryTable = ({ data }: { data: number[][] }) => {
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const FullTable = ({ data }: { data: Country[] }) => {
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const growthData = useMemo(() => calculateGrowthData(data), [data]);
  const globalGrowthData = sumGrowthData(growthData);

  if (loading) {
    return (
      <Layout>
        <SEO title="Latest" />
        <p>Loading</p>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <SEO title="Latest" />
        <p>{error.message}</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <SEO title="Latest" />
      <p>Global rates of change in the Covid19 death count over the six most recent 5-day periods.</p>
      <p>In total:</p>
      <SummaryTable data={[globalGrowthData]} />
      <p>By country:</p>
      <FullTable data={growthData} />
    </Layout>
  );
};

export default IndexPage;
