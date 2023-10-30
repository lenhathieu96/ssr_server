import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import TrackAPI from '@root/TrackApi';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

import rootSchema from '@graphql-schema';

const { parsed } = dotenv.config({
  path: `environment/.env.${process.env.NODE_ENV}`,
});
const app = express();
const httpServer = http.createServer(app);
const port = parsed?.PORT ?? 8080;

const server = new ApolloServer({
  schema: rootSchema,
  nodeEnv: process.env.NODE_ENV,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
  '/',
  cors<cors.CorsRequest>(),
  // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
  bodyParser.json({ limit: '50mb' }),
  expressMiddleware(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          trackAPI: new TrackAPI({ cache }),
        },
      };
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: port }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${port}/`);
