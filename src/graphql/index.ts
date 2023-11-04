import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolverFiles = loadFilesSync(
  path.join(__dirname, './features/*/resolver.ts')
);

const schemaFiles = loadFilesSync(
  path.join(__dirname, './features/*/schema.graphql')
);

const rootTypeDef = mergeTypeDefs(schemaFiles);
const rootResolver = mergeResolvers(resolverFiles);

const rootSchema = makeExecutableSchema({
  typeDefs: rootTypeDef,
  resolvers: rootResolver,
});

export default rootSchema;
