import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Layout from '../components/shared/general/layout';
import SEO from '../components/shared/general/seo';
import { PERIOD_LENGTH } from '../utilities/periodUtils';
import { Countries } from '../utilities/types/data';
import { calculateData } from '../utilities/calcAllData';
import { sumPeriodData } from '../utilities/calcGlobal';
import DataContent from '../components/data/dataContent';
import CountryQuery from '../utilities/query';

const DataPage = () => {
  const [periodLength, setPeriodLength] = useState(PERIOD_LENGTH);
  const { loading, error, data } = useQuery<Countries>(CountryQuery);
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
