import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  Countries, countryQuery, calculateData, sumPeriodData, PERIOD_LENGTH,
} from '../utilities/getData';
import DataContent from '../components/dataContent';

const DataPage = () => {
  const [periodLength, setPeriodLength] = useState(PERIOD_LENGTH);
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const countries = useMemo(() => calculateData(data, periodLength), [data, periodLength]);
  const allData = [...countries, ...sumPeriodData(countries, periodLength)];
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
    <DataContent
      countries={allData}
      period={periodLength}
      onPeriodChange={(event) => { setPeriodLength(Number(event.target.value)); }}
    />
  );
};

export default DataPage;
