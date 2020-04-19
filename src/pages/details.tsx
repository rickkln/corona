import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Legend from '../components/legend';

const DetailsPage = () => (
  <Layout>
    <SEO title="Details" />
    <Legend />
    <h2>Covid-19 Pandemic Information</h2>
    <p>
      If you want expert information visit
      {' '}
      <a href="https://www.endcoronavirus.org/">EndCoronavirus.org</a>
      ,
      which provides extensive information, policy advice and guidelines
      for the fight against Covid-19.
    </p>
    <p>
      If you want my 2 cents on the pandemic,
      and what options we have in fighting it you can read my blog post:
      {' '}
      <a href="https://rickkln.com/blog/covid-stop-fighting-the-lockdown">Stop Fighting The Lockdown</a>
      . Summary: the pandemic is serious; we won&apos;t have an economy if we don&apos;t defeat it;
      herd immunity and waiting on a vaccine are not real strategies; masks, lockdowns,
      travel bans, and mass testing are.
    </p>
    <p>
      Other useful resources:
    </p>
    <ul>
      <li><a href="https://www.endcoronavirus.org/">EndCoronavirus.org</a></li>
      <li><a href="https://necsi.edu/corona-virus-pandemic">NECSI Coronavirus resources</a></li>
      <li><a href="https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca">Act today or people will die - Tomas Pueyo</a></li>
      <li><a href="https://medium.com/@tomaspueyo/coronavirus-the-hammer-and-the-dance-be9337092b56">The hammer and the dance - Tomas Pueyo</a></li>
      <li><a href="https://medium.com/@tomaspueyo/coronavirus-out-of-many-one-36b886af37e9">Out of many one - Tomas Pueyo</a></li>
    </ul>
  </Layout>
);

export default DetailsPage;
