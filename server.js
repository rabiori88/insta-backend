import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "dsfss",
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server
  .listen()
  .then(() =>
    console.log("server is running localhost http://localhost:4000/")
  );
