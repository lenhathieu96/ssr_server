import { Db } from 'mongodb';

import { MenuModule } from './types';

export default <MenuModule.Resolvers>{
  Query: {
    getAllFood: async (_, __, ctx: { db: Db }) => {
      const collection = ctx.db.collection('restaurants');
      console.log(collection);
      return [
        {
          id: '1',
          name: 'cha',
        },
      ];
    },
  },
};
