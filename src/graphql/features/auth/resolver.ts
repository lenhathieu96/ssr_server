import { AuthModule } from './types';

export default <AuthModule.Resolvers>{
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        console.log(username, password);
        return {
          code: 200,
          message: 'good',
          accessToken: 'this is access token',
        };
      } catch (e) {
        console.log(e);
        return {
          code: 404,
          message: 'bad',
          accessToken: 'this is access token',
        };
      }
    },
  },
};
