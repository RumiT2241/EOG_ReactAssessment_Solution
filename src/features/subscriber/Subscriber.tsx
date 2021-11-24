import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from 'urql';
import { measurementRecevied } from './actions';
import query from './query';
import { Measurement } from '../../types';
import { IState } from '../../store';

let measurementsTillNow: Measurement[] = [];

const Subscriber = () => {
  const dispatch = useDispatch();

  const allMetrics = useSelector((state: IState) => state.filters.metrics);  
  const [{ data }] = useSubscription({ query });

  useEffect(() => {
    if (!data || !data.newMeasurement) return;

    // All measurements not received yet, so wait for more measurements
    if (measurementsTillNow.length < allMetrics.length) {
      measurementsTillNow.push(data.newMeasurement);
    } else {

      // Dispatch action only if the measurements have changed
      dispatch(measurementRecevied(measurementsTillNow));
      measurementsTillNow = [];
    }
  }, [data, allMetrics]);

  return null;
};

export default Subscriber;
