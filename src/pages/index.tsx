import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  countryQuery, calculateData, sumPeriodData, Countries, OutbreakStatus,
} from '../utilities/getData';
import { SummaryTable } from '../components/growthTables';
import { getStatusInfo } from '../components/legend';

const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const allData = useMemo(() => calculateData(data), [data]);
  const losingData = allData.filter(
    (country) => country.periods[0].status === OutbreakStatus.Losing,
  );
  const winningData = allData.filter(
    (country) => country.periods[0].status === OutbreakStatus.Winning,
  );
  const globalData = sumPeriodData(allData);
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
            marginBottom: '1.2em',
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
          <SummaryTable data={globalData} />
        </div>
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
          <SummaryTable data={winningData} />
          <Link to="/data">More Data</Link>
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
          <SummaryTable data={losingData} />
          <Link to="/data">More Data</Link>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
