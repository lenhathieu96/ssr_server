import Middleware from '@middleware';
import Router from '@router';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';

import { ROUTE_PATH } from '@utils/constants';

const ENV = process.env.NODE_ENV;
const ENV_PATH = `environment/${ENV}`;

const { parsed } = dotenv.config({
  path: `${ENV_PATH}/.env.${ENV}`,
});
const port = parseInt(parsed?.PORT ?? '8080', 10);
const databaseUri = parsed?.MONGODB_URI;
const credentials = `${ENV_PATH}/mongodb_cert.pem`;

async function startServer() {
  try {
    if (!databaseUri) {
      throw new Error('Invalid database uri');
    }

    const client = new MongoClient(databaseUri, {
      ssl: true,
      tlsCertificateKeyFile: credentials,
      authMechanism: 'MONGODB-X509',
      authSource: '$external',
    });

    const app = express();
    //prevent brute force
    app.use(Middleware.rateLimiter);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const mainRouteList = Object.keys(
      ROUTE_PATH
    ) as (keyof typeof ROUTE_PATH)[];
    mainRouteList.forEach((route) => {
      if (route === 'authentication') app.use(ROUTE_PATH[route], Router[route]);
      else app.use(ROUTE_PATH[route], Middleware.authentication, Router[route]);
    });
    client.connect();

    app.use((err, _, res, __) => {
      console.error(err.stack);
      res.status(500).send('Server is not available, Please try again later!');
    });

    app.listen(port, () => {
      console.log(`🚀 Server ready at port: ${port}`);
    });
  } catch (e) {
    console.log('❌ Cannot start sever \n', e);
  }
}

startServer();
