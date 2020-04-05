import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 180) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Img
      style={{
        margin: '0 auto 0.8rem',
        minWidth: '125px',
        minHeight: '125px',
        maxWidth: '180px',
        maxHeight: '180px',
        borderRadius: '180px',
        borderStyle: 'solid',
        borderWidth: '5px',
      }}
      fluid={data.placeholderImage.childImageSharp.fluid}
    />
  );
};

export default Logo;
