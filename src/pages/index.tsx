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
  if (globalData[0].growthRate > 0) {
    BattleStatus = (
      <p>
        <strong>No</strong>
        , globally new deaths rose by
        {' '}
        <strong>
          {globalData[0].growthRate}
          %
        </strong>
        {' '}
        in the last 5-day period.
      </p>
    );
  } else {
    BattleStatus = (
      <p>
        <strong>Yes</strong>
        , globally new deaths fell by
        {' '}
        <strong>
          {globalData[0].growthRate}
          %
        </strong>
        {' '}
        in the last 5-day period.
      </p>
    );
  }
  return (
    <Layout>
      <SEO title="Latest" />
      <h1>Are we winning?</h1>
      { BattleStatus }
      <SummaryTable data={[globalData]} />
      <h1>Where are we doing best?</h1>
      <FullTable data={winningData} />
      <h1>Where are we doing worst?</h1>
      <FullTable data={losingData} />
    </Layout>
  );
};

export default IndexPage;
