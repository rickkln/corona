import React from 'react';
import Layout from '../components/shared/general/layout';
import SEO from '../components/shared/general/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a link to a page that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
