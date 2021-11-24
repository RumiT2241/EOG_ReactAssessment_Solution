import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getSelectedMetrics, getLatestMeasurements } from './selectors';
import { Box, makeStyles, CircularProgress } from '@material-ui/core';
import { chartColors } from '../../constants';

// Styles for the Tile showing the metric info
const useStyles = makeStyles({
  container: {
    padding: '16px',
    border: '2px solid #eaeaea',
  },
  title: {
    color: '#ffffff',
  },
  value: {
    margin: 0,
    fontSize: '2em',
    fontFamily: 'Roboto',
    color: '#ffffff',
  },
});

const Tiles = () => {
  const metrics = useSelector(getSelectedMetrics);
  const measurements = useSelector(getLatestMeasurements);
  const classes = useStyles();
  
  return metrics.length ? (
    <Grid container spacing={2}>
      {metrics.map((m, i) => (
        <Grid key={i} item xs={2}>
          <Box className={classes.container} style={{ backgroundColor: chartColors[i] }}>
            <div className={classes.title}>{m.title}</div>
            <div className={classes.value}>{measurements[m.title] || '--'}</div>
          </Box>
        </Grid>
      ))}
    </Grid>
  ) : null;
};

export default Tiles;
