import React, { useEffect } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSelectedMetrics } from '../tiles/selectors';
import { useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { getChartData, IChartData } from './getChartData';
import { Paper } from '@material-ui/core';
import { getUnits } from './utils';
import { IState } from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import { chartColors } from '../../constants';
import query from './query';

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f2f2f2'
  },
}));

const Charting = () => {
  const metrics = useSelector(getSelectedMetrics);
  const measurements = useSelector((state: IState) => state.measurements);
  const startTime = new Date().getTime() - 34 * 60 * 1000;
  const classes = useStyles();

  const [_, executeQuery] = useQuery({
    query,
    pause: true,
    variables: {
      input: metrics.map((metric) => ({
        metricName: metric.title,
        after: startTime,
      })),
    },
  });

  useEffect(() => {
    executeQuery();
  }, [metrics.length]);

  const chartData: IChartData[] = getChartData(
    measurements,
    metrics.map((m: any) => m.title),
  );

  if (!chartData.length) return null;
  const units = getUnits(measurements);

  return chartData.length ? (
    <Paper className={classes.wrapper}>
      <ResponsiveContainer height={500}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          {metrics.map((m, i) => (
            <YAxis key={m.title} unit={units[m.title]} yAxisId={`left${i + 1}`} orientation="left" />
          ))}
          <Tooltip labelFormatter={(label) => <span>{new Date(+label).toString()}</span>} />
          <Legend />
          {metrics.map((m, i) => (
            <Line
              key={m.title}
              unit={units[m.title]}
              yAxisId={`left${i + 1}`}
              dataKey={m.title}
              activeDot={{ r: 8 }}
              stroke={chartColors[i]}
              dot={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  ) : null;
};

export default React.memo(Charting);
