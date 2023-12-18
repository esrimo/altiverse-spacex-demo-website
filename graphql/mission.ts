import gql from "graphql-tag";

const missions = gql`
  query missions($shipId: ID!) {
    missions(shipId: $shipId)  {
      id
      shipId
      name
      cargo
      destination
    }
  }
`;

const query = { missions };
const mutations = {};
const Missions = { query, mutations };
export { Missions };
