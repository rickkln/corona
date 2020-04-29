import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  Countries, countryQuery, calculateData,
} from '../utilities/getData';
import DataContent from '../components/dataContent';

const DataPage = () => {
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const countries = useMemo(() => calculateData(data), [data]);
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
    <DataContent countries={countries} />
  );
};

export default DataPage;
