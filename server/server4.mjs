import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import * as typeDefs from "./src/typeDef-Resolvers/Schema/typeDef.mjs";
import { SCHEMA } from "../server/src/typeDef-Resolvers/Resolvers/schema.mjs";

const resolvers = SCHEMA;
const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const _RUN_SERVER_ = async () => {
  const START_SERVER = await server.start();
  const PARSE_CORS_TO_EXPRESS_MIDDLEWARE = app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server)
  );
  const RESOLVE_HTTP_LISTEN = await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  const SERVER_READY = console.log(`🚀 Server ready at http://localhost:4000`);
  return START_SERVER.then(
    () =>
      PARSE_CORS_TO_EXPRESS_MIDDLEWARE && RESOLVE_HTTP_LISTEN && SERVER_READY
  );
};
_RUN_SERVER_();
