import React, { useState, CSSProperties } from 'react';
import { Link } from 'gatsby';
import Switch from 'react-switch';
import Layout from './layout';
import SEO from './seo';
import {
  getTags, Country,
} from '../utilities/getData';
import {
  GrowthTable, NewDeathsTable, TotalDeathsTable, NewCasesTable, TotalCasesTable,
} from './tables';
import DataChart from './dataChart';
import CountryFilter, { Tags } from './countryFilter';
import styles from './dataContent.module.css';

const buttonStyle: CSSProperties = {
  fontSize: '0.85em',
  background: 'none',
  borderColor: 'black',
  borderRadius: '0.4em',
  margin: '0.4rem 0.6rem 1rem 0rem',
  outline: 'none',
};

const activeStyles: CSSProperties = {
  fontWeight: 900,
  padding: '1px 5px 1px',
  borderWidth: '2px',
};

type Table =
  | 'growth'
  | 'totalDeaths'
  | 'newDeaths'
  | 'totalCases'
  | 'newCases';

const DataContent = ({ countries }: { countries: Country[] }) => {
  const [selectedTable, setSelectedTable] = useState<Table>('newDeaths');
  const possibleTags = React.useMemo(() => getTags(countries), [countries]);
  const [tags, setTags] = useState<Tags>({
    currentTags: [
      { id: 'US', name: 'US' },
      { id: 'Brazil', name: 'Brazil' },
      { id: 'United Kingdom', name: 'United Kingdom' },
    ],
    suggestedTags: possibleTags,
  });
  const [showAll, setShowAll] = useState(true);
  return (
    <Layout>
      <SEO title="All Data" />
      <h1 style={{ marginBottom: '0.8rem' }}>All Data</h1>
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
        <br />
        <label>
          <span>Include all countries</span>
          <Switch
            id="showAll"
            onChange={setShowAll}
            checked={showAll}
            onColor="#28c53c"
            offColor="#ddd"
            className={styles.switch}
          />
        </label>
      </p>
      <CountryFilter tags={tags} setTags={setTags} />
      {selectedTable === 'growth'
        && <DataChart countries={countries} x="endDate" y="growthRate" tags={tags.currentTags} showAll={showAll} />}
      {selectedTable === 'newDeaths'
        && <DataChart countries={countries} x="endDate" y="newDeaths" tags={tags.currentTags} showAll={showAll} />}
      {selectedTable === 'totalDeaths'
        && <DataChart countries={countries} x="endDate" y="totalDeaths" tags={tags.currentTags} showAll={showAll} />}
      {selectedTable === 'newCases'
        && <DataChart countries={countries} x="endDate" y="newCases" tags={tags.currentTags} showAll={showAll} />}
      {selectedTable === 'totalCases'
        && <DataChart countries={countries} x="endDate" y="totalCases" tags={tags.currentTags} showAll={showAll} />}
      <small>
        The table below is color coded by
        {' '}
        <Link to="/details">Outbreak Status</Link>
      </small>
      {selectedTable === 'growth' && <GrowthTable data={countries} />}
      {selectedTable === 'newDeaths' && <NewDeathsTable data={countries} />}
      {selectedTable === 'totalDeaths' && <TotalDeathsTable data={countries} />}
      {selectedTable === 'newCases' && <NewCasesTable data={countries} />}
      {selectedTable === 'totalCases' && <TotalCasesTable data={countries} />}
    </Layout>
  );
};

export default DataContent;
