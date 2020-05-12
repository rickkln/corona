import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import Layout from '../components/shared/general/layout';
import SEO from '../components/shared/general/seo';
import { GrowthSummaryTable } from '../components/shared/tables/tables';
import { getStatusInfo } from '../components/details/legend';
import SummaryChart from '../components/status/summaryChart';
import { Countries } from '../utilities/types/data';
import { calculateData } from '../utilities/calcAllData';
import { PERIOD_LENGTH } from '../utilities/periodUtils';
import { sumPeriodData, calculateGlobalSummary } from '../utilities/calcGlobal';
import OutbreakStatus from '../utilities/types/OutbreakStatus';
import CountryQuery from '../utilities/query';
import PandemicFreeChart from '../components/status/pandemicFreeChart';

const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(CountryQuery);
  const countries = useMemo(() => calculateData(data, PERIOD_LENGTH), [data]);
  const globalData = sumPeriodData(countries, PERIOD_LENGTH);
  const globalSummaryData = calculateGlobalSummary(countries, PERIOD_LENGTH);
  const globalSummarySinceTwoMonths = globalSummaryData.slice(60 / PERIOD_LENGTH);
  const losingData = countries.filter(
    (country) => country.periods[0].status === OutbreakStatus.Losing
      || country.periods[0].status === OutbreakStatus.Flattening,
  );
  const winningData = countries.filter(
    (country) => country.periods[0].status === OutbreakStatus.Winning
      || country.periods[0].status === OutbreakStatus.Won,
  );
  if (loading) {
    return (
      <Layout>
        <SEO title="Status" />
        <p style={{ textAlign: 'center' }}>Loading</p>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <SEO title="Status" />
        <p>{error.message}</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <SEO title="Status" />
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
          <GrowthSummaryTable data={globalData} periodLength={PERIOD_LENGTH} />
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: '1.2rem',
        }}
      >
        <h3 style={{ marginBottom: '0.8rem' }}>In how many places are winning?</h3>
        <SummaryChart data={globalSummarySinceTwoMonths} />
      </div>
      <p className="chart-comment">
        The
        {' '}
        <em>Won</em>
        {' '}
        status above only looks at deaths, and should therefore be a slight leading
        indicator compared to the
        {' '}
        <em>Pandemic Free</em>
        {' '}
        status
        in the chart below, which requires both no deaths and no cases.
        {' '}
        <em>Pandemic Free</em>
        {' '}
        should also decrease in the begging as outbreaks start, and then increase once countries
        succesfully eradicate the virus.
      </p>
      <div
        style={{
          textAlign: 'center',
          marginTop: '1.2rem',
        }}
      >
        <h3 style={{ marginBottom: 0 }}>How much of the world is pandemic free?</h3>
        <PandemicFreeChart data={globalSummaryData} />
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
          <h3>Where are we succeeding?</h3>
          <GrowthSummaryTable data={winningData} periodLength={PERIOD_LENGTH} desc={false} />
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
          <h3>Where are we failing?</h3>
          <GrowthSummaryTable data={losingData} periodLength={PERIOD_LENGTH} />
          <Link to="/data">More Data</Link>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
