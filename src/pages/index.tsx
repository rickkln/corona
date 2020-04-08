import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Layout from '../components/layout';
import SEO from '../components/seo';

const today = new Date();
const periodOne = new Date(new Date().setDate(today.getDate() - 30));
const apiDateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
const queryDate = apiDateFormat.format(periodOne);

export const getResults = gql`
  query ($queryDate: String) {
    results(date: { gt: $queryDate }) {
      country {
        name
      }
      date
      deaths
    }
  }
`;

const IndexPage = () => {
  const { loading, error, data } = useQuery(
    getResults,
    {
      variables: { queryDate },
    },
  );
  console.log(data);
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
