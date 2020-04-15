import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  countryQuery, calculateData, sumPeriodData, Countries, OutbreakStatus,
} from '../utilities/getData';
import { SummaryTable, FullTable } from '../components/growthTables';

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
  let BattleStatus;
  if (globalData[0].periods[0].growthRate > 0) {
    BattleStatus = (
      <span>
        <strong>No</strong>
        , globally new deaths rose by
        {' '}
        <strong>
          {globalData[0].periods[0].growthRate}
          %
        </strong>
        {' '}
        in the last 5-day period.
      </span>
    );
  } else {
    BattleStatus = (
      <span>
        <strong>Yes</strong>
        , globally new deaths fell by
        {' '}
        <strong>
          {globalData[0].periods[0].growthRate}
          %
        </strong>
        {' '}
        in the last 5-day period.
      </span>
    );
  }
  return (
    <Layout>
      <SEO title="Latest" />
      <h1>Is the world winning?</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          { BattleStatus }
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
        <div style={{ flex: 1, minWidth: '300px', padding: '0 1em' }}>
          <h3>Where are we winning?</h3>
          <SummaryTable data={winningData} />
        </div>
        <div style={{ flex: 1, minWidth: '300px', padding: '0 1em' }}>
          <h3>Where are we losing?</h3>
          <SummaryTable data={losingData} />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
