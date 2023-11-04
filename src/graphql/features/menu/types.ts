/* eslint-disable */
import * as Types from "../base-types";
import * as gm from "graphql-modules";
export namespace MenuModule {
  interface DefinedFields {
    Query: 'getAllFood';
    Food: 'id' | 'name';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Food = Pick<Types.Food, DefinedFields['Food']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type FoodResolvers = Pick<Types.FoodResolvers, DefinedFields['Food'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Food?: FoodResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getAllFood?: gm.Middleware[];
    };
    Food?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
    };
  };
}