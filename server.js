require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

const PORT = process.env.PORT;
const startServer = async () => {
  const app = express();
  //app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectedResolver,
      };
    },
  });
  await server.start();

  server.applyMiddleware({ app });
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
