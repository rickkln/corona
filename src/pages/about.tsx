import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <p>
      There are various great Covid-19 tracking and information websites.
      {' '}
      <a href="https://www.endcoronavirus.org/">EndCoronavirus.org</a>
      , which is backed by the NECSI, being the best one I have found.
      This one aims to provide simple tools for live updates on the rate of change in
      death count globally. As well as be a venue for
      {' '}
      <a href="https://rickkln.com">me</a>
      {' '}
      to teach myself some things.
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
    </p>
    <p>
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
  </Layout>
);

export default AboutPage;
