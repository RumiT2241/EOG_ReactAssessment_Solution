import { ApiErrorAction, Measurement } from '../../types';

// Action types for the fetching of measurements
// TODO: Use ENUMS for action types
export const actionTypes = {
  MEASUREMENT_RECEIVED: 'MEASUREMENT_RECEIVED',
  MEASUREMENT_ERROR_RECEIVED: 'MEASUREMENT_ERROR_RECEIVED',
};

export const measurementRecevied = (payload: Measurement[]) => ({
  type: actionTypes.MEASUREMENT_RECEIVED,
  payload,
});

export const measurementErrorReceived = (payload: ApiErrorAction) => ({
  type: actionTypes.MEASUREMENT_ERROR_RECEIVED,
  payload,
});
