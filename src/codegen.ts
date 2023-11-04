import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/features/*/schema.graphql',
  generates: {
    './src/graphql/features/': {
      preset: 'graphql-modules',
      presetConfig: {
        baseTypesPath: './base-types.ts',
        filename: 'types.ts',
      },
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['eslint --fix'],
  },
};
export default config;
