import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/shared/general/layout';
import SEO from '../components/shared/general/seo';

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <p>
      This site aims to provide a simple tool to track global progress in defeating Covid-19,
      by focusing on the rate of change in death count globally.
    </p>
    <p>
      All data is pulled from the
      {' '}
      <a href="https://github.com/CSSEGISandData/COVID-19">COVID-19 data repository</a>
      {' '}
      provided by Johns Hopkins University.
      Which in turn pulls data from various government sources, and tracking projects such as
      {' '}
      <a href="https://www.worldometers.info/coronavirus">WorldoMeters</a>
      .
      All code for this site is
      {' '}
      <a href="https://github.com/rickkln/corona">open source</a>
      . It is built with
      {' '}
      <a href="https://www.gatsbyjs.org/">Gatsby</a>
      {' '}
      and consumes the Johns Hopkins data via a
      {' '}
      <a href="https://github.com/rlindskog/covid19-graphql">GraphQl</a>
      {' '}
      API which in turn wraps a another
      {' '}
      <a href="https://github.com/pomber/covid19">parser</a>
      .
    </p>
    <p>
      There are various other great Covid-19 tracking and information websites.
      {' '}
      <a href="https://www.endcoronavirus.org/">EndCoronavirus.org</a>
      , which is backed by the NECSI, being the best one I have found.
      For a full list of recommended resources view
      {' '}
      <Link to="/details">Details</Link>
      .
    </p>
  </Layout>
);

export default AboutPage;
