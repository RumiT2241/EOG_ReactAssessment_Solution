import React from 'react';
import { Grid } from '@material-ui/core';
import { Provider as UqrlProvider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { API_END_POINT, subscriptionClient } from '../../constants';
import Charting from '../../features/charting/Charting';
import Filters from '../../features/filters/Filters';
import Tiles from '../../features/tiles/tiles';
import Subscriber from '../../features/subscriber/Subscriber';

/*
  - Using urql as GraphQL client
  - Subscriber can't be a part of Home component as it makes the component reload unnecessarily
  So keeping it as a child component here
*/
const Home = () => {
  return (
    <Grid container style={{
      flexGrow: 1,
      overflow: 'auto',
      padding: '20px 0',
    }} justifyContent="center">
      <Grid item xs={8} style={{
        padding: 30,
        margin: 'auto',
        borderLeft: '1px solid #ddd',
        borderRight: '1px solid #ddd',
        minHeight: 'calc(100vh - 64px)',
        background: '#ffffff',
      }}>
        <UqrlProvider
          value={createClient({
            url: API_END_POINT,
            exchanges: [
              ...defaultExchanges,
              subscriptionExchange({
                forwardSubscription: (operation) => subscriptionClient.request(operation),
              }),
            ],
          })}
        >
          <Filters />
          <Tiles />
          <Charting />
          <Subscriber />
        </UqrlProvider>
      </Grid>
    </Grid>
  );
};

export default Home;
