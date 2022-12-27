import { gql } from "apollo-server-express";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    user: [User]
    messages: [Messages]
    createdAt: String!
    updatedAt: String!
  }
`;
