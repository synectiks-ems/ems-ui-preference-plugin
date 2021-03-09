import { ApolloClient, createNetworkInterface } from 'react-apollo';
import {config} from './domain/application/config';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:9091/graphql'
  // uri: config.GRAPHQL_URL
});
export const gQLClient = new ApolloClient({
  networkInterface: networkInterface
});