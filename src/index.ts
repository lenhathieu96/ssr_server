import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import rootResolver from "@resolver";
import rootTypeDef from "@type-defs";

const server = new ApolloServer({
  typeDefs: rootTypeDef,
  resolvers: rootResolver,
});

const { url } = await startStandaloneServer(server);
console.log(url ? `🚀 Server ready at ${url}` : `Cannot start sever at ${url}`);
