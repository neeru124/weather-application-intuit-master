export interface CurrentWeather {
  date?: string;
  day?: string;
  weatherDescription?: string;
  tempCelsius?: number;
  tempFahrenheit?: number;
  pressure?: number;
  humidity?: number;
  wind_kph?: number;
  wind_mph?: number;
  mintempCelsius?: number;
  maxtempCelsius?: number;
  mintempFahrenheit?: number;
  maxtempFahrenheit?: number;
  icon?: any;
  feelsLike_c?: number;
  feelsLike_f?: number;
  imagePath?: string;
}

export const WEEKDAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
