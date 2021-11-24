import { SubscriptionClient } from 'subscriptions-transport-ws';

// API End points for making request to the server for fetching data
// TODO: make a services directory and keep all API calls there
export const API_END_POINT = `https://react.eogresources.com/graphql`;
export const GRAPHQL_DATA_END_POINT = `wss://react.eogresources.com/graphql`;

export const subscriptionClient = new SubscriptionClient(GRAPHQL_DATA_END_POINT, {
  timeout: 10000,
  // reconnect if connect breaks
  reconnect: true,
});

export const chartColors = ['#238447', '#324783', '#327474', '#DC7921', '#242647', '#238AE6', '#DC7921'];