import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  countryQuery,
  calculateData,
  sumPeriodData,
  Countries,
  OutbreakStatus,
  calculateGlobalSummary,
} from '../utilities/getData';
import { GrowthSummaryTable } from '../components/tables';
import { getStatusInfo } from '../components/legend';
import SummaryChart from '../components/summaryChart';

const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const allData = useMemo(() => calculateData(data), [data]);
  const globalData = sumPeriodData(allData);
  const globalSummaryData = calculateGlobalSummary(allData);
  globalSummaryData.reverse();
  const losingData = allData.filter(
    (country) => country.periods[0].status === OutbreakStatus.Losing,
  );
  const winningData = allData.filter(
    (country) => country.periods[0].status === OutbreakStatus.Winning,
  );
  if (loading) {
    return (
      <Layout>
        <SEO title="Latest" />
        <p style={{ textAlign: 'center' }}>Loading</p>
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
      <h1>How is the world doing?</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: '300px',
          }}
        >
          In the last 5 days we&apos;ve
          {globalData[0].periods[0].status === OutbreakStatus.Won
            ? ' '
            : ' been '}
          {getStatusInfo(globalData[0].periods[0].status)}
          {' '}
          <Link to="/details">Status Info</Link>
        </div>
        <div style={{ flex: 1 }}>
          <GrowthSummaryTable data={globalData} />
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: '1.2rem',
        }}
      >
        <h3 style={{ marginBottom: '0.8rem' }}>How many places are winning?</h3>
        <SummaryChart data={globalSummaryData} />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 -1em',
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: '300px',
            padding: '0 1em',
            textAlign: 'center',
          }}
        >
          <h3>Where are we winning?</h3>
          <GrowthSummaryTable data={winningData} />
          <Link to="/data">More Data</Link>
          <br />
          <br />
        </div>
        <div
          style={{
            flex: 1,
            minWidth: '300px',
            padding: '0 1em',
            textAlign: 'center',
          }}
        >
          <h3>Where are we losing?</h3>
          <GrowthSummaryTable data={losingData} />
          <Link to="/data">More Data</Link>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
