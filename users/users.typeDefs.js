import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
// isFollowing: Boolean!
// isMe: Boolean!
