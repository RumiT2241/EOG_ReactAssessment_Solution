import { spawn } from 'redux-saga/effects';
import weatherSaga from '../features/weather/saga.ts';

/* 
  Root Saga for the Weather API 
*/
export default function* () {
  yield spawn(weatherSaga);
}
