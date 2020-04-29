import React, { useMemo, useState, CSSProperties } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  Countries, countryQuery, calculateData,
} from '../utilities/getData';
import {
  GrowthTable, NewDeathsTable, TotalDeathsTable, NewCasesTable, TotalCasesTable,
} from '../components/tables';
import DataChart from '../components/dataChart';

const buttonStyle: CSSProperties = {
  fontSize: '0.85em',
  background: 'none',
  borderColor: 'black',
  borderRadius: '0.4em',
  fontWeight: 'bold',
  padding: '1px 6px 2px',
  margin: '0.4rem 0.6rem 1rem 0rem',
  outline: 'none',
};

const activeStyles: CSSProperties = {
  fontWeight: 900,
  borderWidth: '2px',
};

type Table =
  | 'growth'
  | 'totalDeaths'
  | 'newDeaths'
  | 'totalCases'
  | 'newCases';

const DataPage = () => {
  const [selectedTable, setSelectedTable] = useState<Table>('growth');
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const allData = useMemo(() => calculateData(data), [data]);
  if (loading) {
    return (
      <Layout>
        <SEO title="All Data" />
        <p style={{ textAlign: 'center' }}>Loading</p>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <SEO title="All Data" />
        <p>{error.message}</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <SEO title="All Data" />
      <h1 style={{ marginBottom: '0.8rem' }}>All Data</h1>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'growth'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('growth')}
      >
        Growth
      </button>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'newDeaths'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('newDeaths')}
      >
        New Deaths
      </button>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'totalDeaths'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('totalDeaths')}
      >
        Total Deaths
      </button>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'newCases'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('newCases')}
      >
        New Cases
      </button>
      <button
        type="button"
        style={{
          ...buttonStyle,
          ...(selectedTable === 'totalCases'
            ? activeStyles
            : {}),
        }}
        onClick={() => setSelectedTable('totalCases')}
      >
        Total Cases
      </button>
      <p>
        {selectedTable === 'growth' && 'Change in death count.'}
        {selectedTable === 'newDeaths' && 'New deaths in period.'}
        {selectedTable === 'totalDeaths' && 'Deaths to date.'}
        {selectedTable === 'newCases' && 'New cases in period.'}
        {selectedTable === 'totalCases' && 'Cases to date.'}
        {' '}
        Color coded by
        {' '}
        <Link to="/details">Outbreak Status</Link>
      </p>
      {selectedTable === 'growth' && <DataChart data={allData} x="endDate" y="growthRate" />}
      {selectedTable === 'newDeaths' && <DataChart data={allData} x="endDate" y="newDeaths" />}
      {selectedTable === 'totalDeaths' && <DataChart data={allData} x="endDate" y="totalDeaths" />}
      {selectedTable === 'newCases' && <DataChart data={allData} x="endDate" y="newCases" />}
      {selectedTable === 'totalCases' && <DataChart data={allData} x="endDate" y="totalCases" />}

      {selectedTable === 'growth' && <GrowthTable data={allData} />}
      {selectedTable === 'newDeaths' && <NewDeathsTable data={allData} />}
      {selectedTable === 'totalDeaths' && <TotalDeathsTable data={allData} />}
      {selectedTable === 'newCases' && <NewCasesTable data={allData} />}
      {selectedTable === 'totalCases' && <TotalCasesTable data={allData} />}
    </Layout>
  );
};

export default DataPage;
