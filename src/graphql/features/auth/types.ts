/* eslint-disable */
import * as Types from "../base-types";
import * as gm from "graphql-modules";
export namespace AuthModule {
  interface DefinedFields {
    Mutation: 'login';
    LoginResponse: 'code' | 'message' | 'accessToken';
  };
  
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type LoginResponse = Pick<Types.LoginResponse, DefinedFields['LoginResponse']>;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type LoginResponseResolvers = Pick<Types.LoginResponseResolvers, DefinedFields['LoginResponse'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    LoginResponse?: LoginResponseResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      login?: gm.Middleware[];
    };
    LoginResponse?: {
      '*'?: gm.Middleware[];
      code?: gm.Middleware[];
      message?: gm.Middleware[];
      accessToken?: gm.Middleware[];
    };
  };
}