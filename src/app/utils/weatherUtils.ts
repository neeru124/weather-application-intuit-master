export const convertToCelsius = (tempInFahrenheit: number) =>
  Number((((tempInFahrenheit - 32) * 5) / 9).toFixed(2));

export const convertToDate = (milliseconds: number) => new Date(milliseconds);

export const convertToKM = (windSpeedInMiles: number) =>
  Math.round(windSpeedInMiles * 1.6);

export const imgUrl = (weatherStatus: string) =>
  `/assets/currentWeatherImages/${weatherStatus.split(' ').join('_').toLowerCase()}.jpg`;

