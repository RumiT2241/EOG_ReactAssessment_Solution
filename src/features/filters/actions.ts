import { ApiErrorAction } from '../../types';

export const actionTypes = {
  METRICS_DATA_RECEIVED: 'METRICS_DATA_RECEIVED',
  METRICS_API_ERROR_RECEIVED: 'METRICS_API_ERROR_RECEIVED',
  METRICS_SELECTED: 'METRICS_SELECTED',
};

export const metricsDataRecevied = (payload: string[]) => ({
  type: actionTypes.METRICS_DATA_RECEIVED,
  payload,
});

export const metricSelected = (payload: string[]) => ({
  type: actionTypes.METRICS_SELECTED,
  payload,
});

export const metricsApiErrorReceived = (payload: ApiErrorAction) => ({
  type: actionTypes.METRICS_API_ERROR_RECEIVED,
  payload,
});
