import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

import rootSchema from '@graphql-schema';

const env = process.env.NODE_ENV;
const envPath = `environment/${env}`;

async function startServer() {
  try {
    const { parsed } = dotenv.config({
      path: `${envPath}/.env.${env}`,
    });

    const port = parseInt(parsed?.PORT || '8080', 10);
    const databaseUri = parsed?.MONGODB_URI;
    const credentials = `${envPath}/mongodb_cert.pem`;

    if (!databaseUri) {
      throw new Error('Invalid database uri');
    }

    const client = new MongoClient(databaseUri, {
      ssl: true,
      tlsCertificateKeyFile: credentials,
      authMechanism: 'MONGODB-X509',
      authSource: '$external',
    });

    const server = new ApolloServer({
      schema: rootSchema,
      nodeEnv: process.env.NODE_ENV,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: port },
      context: async () => {
        return {
          db: client.db('SS_Restaurant'),
        };
      },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (e) {
    console.log('❌ Cannot start sever \n', e);
  }
}

startServer();
