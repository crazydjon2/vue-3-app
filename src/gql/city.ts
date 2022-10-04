import gql from "graphql-tag";

export const GET_CITIES = gql`
query cities {
    cities {
      name
      id
    }
  }
`;
