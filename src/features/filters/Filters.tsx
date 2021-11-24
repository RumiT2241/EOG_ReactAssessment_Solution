import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { metricsDataRecevied, metricsApiErrorReceived, metricSelected } from './actions';
import { useQuery } from 'urql';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Grid, makeStyles } from '@material-ui/core';
import { IState } from '../../store';

const query = `{
  getMetrics
}`;

const useStyles = makeStyles(() => ({
  filters: {
    marginTop: 10,
    marginBottom: 30,
  },
}));

const Filters = () => {
  const dispatch = useDispatch();
  const [result] = useQuery({ query });
  const classes = useStyles();
  const { metrics } = useSelector((state: IState) => state.filters);
  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(metricsDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  return (
    <Grid container spacing={2} className={classes.filters}>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          renderInput={(params: any) => (
            <TextField {...params} variant="outlined" label="Select the filter" placeholder="Select..." />
          )}
          options={metrics.map((m: any) => m.title)}
          getOptionLabel={(option: any) => option}
          onChange={(_, values) => dispatch(metricSelected(values))}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
