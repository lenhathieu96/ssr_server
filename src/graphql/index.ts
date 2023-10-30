import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';

const resolverFiles = loadFilesSync(
  path.join(__dirname, './features/*/*.resolver.{js,ts}')
);
const typeDefFiles = loadFilesSync(
  path.join(__dirname, './features/*/*.{gql,graphql}')
);

const rootResolver = mergeResolvers(resolverFiles);
const rootTypeDef = mergeTypeDefs(typeDefFiles);

const rootSchema = makeExecutableSchema({
  typeDefs: rootTypeDef,
  resolvers: rootResolver,
});

export default rootSchema;
