import gql from "graphql-tag";

export const GET_CITIES = gql`
query cities {
    cities {
      name
      id
    }
  }
`;

export const SEARCH_COUNTRIES = gql`
query city($slug: String!) {
    city(input: { slug: $slug }) {
      name
      id
    }
  }
`;
