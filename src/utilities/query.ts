import { gql } from '@apollo/client';

export const CountryQuery = gql`
  query {
    countries {
      name
      results {
        date(format: "yyyy/MM/dd")
        deaths
        confirmed
      }
    }
  }
`;

export default CountryQuery;
