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

const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const allData = useMemo(() => calculateData(data), [data]);
  const globalData = sumPeriodData(allData);
  const globalSummaryData = calculateGlobalSummary(allData);
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
        <h3>How many countries are succeeding?</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            rowGap: '1em',
            marginBottom: '1.4em',
          }}
        >
          <div>
            <h4 style={{ marginBottom: 0 }}>
              Succeeding:
              {' '}
              {globalSummaryData.succeeding}
            </h4>
            <small>Crushing the Curve, Winning, or Won</small>
            <h4 style={{ margin: '0.6rem 0 0' }}>
              Struggling:
              {' '}
              {globalSummaryData.struggling}
            </h4>
            <small>Losing, or just Flattening the Curve</small>
          </div>
          <div>
            <h4 style={{ marginBottom: 0 }}>
              Small Outbreak:
              {' '}
              {globalSummaryData.small}
            </h4>
            <small>Just started, or quickly contained</small>
            <h4 style={{ margin: '0.6rem 0 0' }}>
              No Outbreak:
              {' '}
              {globalSummaryData.none}
            </h4>
            <small>No deaths</small>
          </div>
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
