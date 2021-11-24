import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction, WeatherForLocation } from '../../types';

export const actionTypes = {
  WEATHER_DATA_RECEIVED: 'WEATHER_DATA_RECEIVED',
  WEATHER_API_ERROR_RECEVIED: 'WEATHER_API_ERROR_RECEVIED',
};

export const weatherDataRecevied = (payload: WeatherForLocation) => ({
  type: actionTypes.WEATHER_DATA_RECEIVED,
  payload,
});

export const weatherApiErrorReceived = (payload: ApiErrorAction) => ({
  type: actionTypes.WEATHER_API_ERROR_RECEVIED,
  payload,
});

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchApiError() {
  yield takeEvery(actionTypes.WEATHER_API_ERROR_RECEVIED, apiErrorReceived);
}
