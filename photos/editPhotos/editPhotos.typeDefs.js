import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editPhotos(id: Int!, caption: String!): MutationResponse!
  }
`;
