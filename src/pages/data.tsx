import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  Countries, countryQuery, calculateData,
} from '../utilities/getData';
import { FullTable } from '../components/growthTables';
import Legend from '../components/legend';

const DataPage = () => {
  const { loading, error, data } = useQuery<Countries>(countryQuery);
  const allData = useMemo(() => calculateData(data), [data]);
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
    <Layout>
      <SEO title="All Data" />
      <h1>All Data</h1>
      <p>
        Change in death rates, color coded by Outbreak Status.
        {' '}
        <Link to="/details">View Legend</Link>
      </p>
      <FullTable data={allData} />
    </Layout>
  );
};

export default DataPage;
