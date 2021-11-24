import { actionTypes } from './saga';

interface IWeatherState {
  temperatureinCelsius: number;
  temperatureinFahrenheit: number;
  description: string;
  locationName: string;
}

interface IWeatherAction {
  type: string;
  payload: any;
}

const initialState: IWeatherState = {
  temperatureinCelsius: 0,
  temperatureinFahrenheit: 0,
  description: '',
  locationName: '',
};

const toF = (c: number) => (c * 9) / 5 + 32;

const WeatherReducer = (state = initialState, action: IWeatherAction) => {
  switch (action.type) {
    case actionTypes.WEATHER_DATA_RECEIVED:
      state = { ...state };
      const { description, locationName, temperatureinCelsius } = action.payload;
      state.temperatureinCelsius = temperatureinCelsius;
      state.temperatureinFahrenheit = toF(temperatureinCelsius);
      state.description = description;
      state.locationName = locationName;
      return state;
    default:
      return state;
  }
};

export default WeatherReducer;
