import { timeSeries, TimeSeries } from 'pondjs';
import { actionTypes } from './actions';

export interface IMeasurementState {
  [index: string]: any;
}

interface ISubscriptionAction {
  type: string;
  payload: any;
}

const SubscriptionReducer = (state: IMeasurementState = {}, action: ISubscriptionAction) => {
  switch (action.type) {
    case actionTypes.MEASUREMENT_RECEIVED:
      state = { ...state };
      action.payload.forEach((item: any) => {
        const { metric, at, value, unit } = item;
        const series = timeSeries({
          name: metric,
          columns: ['time', 'value', 'unit'],
          points: [[at, value, unit]],
        });
        // If metric is already processed, merge the series else this becomes the new series
        if (state[metric]) {
          state[metric] = TimeSeries.timeSeriesListMerge({
            name: metric,
            seriesList: [
              state[metric],
              series,
            ],
          });
        } else {
          state[metric] = series;
        }
      });
      return state;
    default:
      return state;
  }
};

export default SubscriptionReducer;
