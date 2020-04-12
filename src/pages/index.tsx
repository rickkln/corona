import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  Countries, countryQuery, calculateGrowthData, sumGrowthData,
} from '../utilities/getData';
import { SummaryTable, FullTable } from '../components/homeTables';

const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const growthData = useMemo(() => calculateGrowthData(data), [data]);
  const globalGrowthData = sumGrowthData(growthData);
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
  if (globalGrowthData[0] > 0) {
    BattleStatus = (
      <p>
        Is humanity winning the battle yet?
        {' '}
        <strong>No.</strong>
        <br />
        Unfortunately there were
        {' '}
        {globalGrowthData[0]}
        % more deaths in the last 5 days, than in the 5 days before that.
        This means pandemic related deaths are still accelerating,
        and we do not yet have the virus under control.
      </p>
    );
  } else {
    BattleStatus = (
      <p>
        Is humanity winning the battle yet?
        {' '}
        <strong>Yes.</strong>
        <br />
        Fortunately there were
        {' '}
        {globalGrowthData[0]}
        % less deaths in the last 5 days, than in the 5 days before that.
        This means pandemic related deaths are slowing down,
        and we are getting the virus under control.
      </p>
    );
  }
  return (
    <Layout>
      <SEO title="Latest" />
      { BattleStatus }
      <p>
        These are the changes in the amount new Covid19 deaths
        over the six most recent 5-day periods globally:
      </p>
      <SummaryTable data={[globalGrowthData]} />
      <p>
        These are the changes in the amount new Covid19 deaths
        over the six most recent 5-day periods by country:
      </p>
      <FullTable data={growthData} />
    </Layout>
  );
};

export default IndexPage;
