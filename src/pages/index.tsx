import React from 'react';
import { useQuery } from '@apollo/client';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Countries, getCountries, calculateGrowthData } from './getData';

const IndexPage = () => {
  const { loading, error, data } = useQuery<Countries>(getCountries);
  const growthData = calculateGrowthData(data);
  console.log(growthData);
  if (loading) {
    return (
      <Layout>
        <SEO title="Latest" />
        <p>Loading</p>
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
      <p>Latest</p>
    </Layout>
  );
};

export default IndexPage;
