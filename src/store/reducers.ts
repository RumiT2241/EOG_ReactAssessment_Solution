import weather from '../features/weather/reducer';
import filters from '../features/filters/reducer';
import measurements from '../features/subscriber/reducer';
import { combineReducers } from 'redux';

// Merging all the reducers using combineReducers here
// Later this reducer will be used to generate types using ReturnType
const reducer = combineReducers({
  weather,
  measurements,
  filters,
});

export default reducer;
