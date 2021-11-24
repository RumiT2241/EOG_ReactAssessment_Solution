// This files contains all the Global types for the application

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type WeatherForLocation = {
  temperatureinCelsius: number;
  description: string;
  locationName: string;
};

export type ApiErrorAction = {
  error: string;
};
