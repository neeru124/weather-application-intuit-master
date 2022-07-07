import { Component, Input, OnInit } from '@angular/core';
import { ImageCodeMap } from 'src/app/image-map';
import { CurrentWeather, WEEKDAY } from 'src/app/interfaces/currWeather.model';
import {
  ForecastWeather,
  List,
} from 'src/app/interfaces/rapidAPIforecast.model';
import { Weather } from 'src/app/interfaces/weather.model';
import { convertToCelsius, convertToDate } from 'src/app/utils/weatherUtils';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss'],
})
export class ForecastWeatherComponent implements OnInit {
  // @Input() weatherForecast!:Weather;
  @Input() weatherForecast!: ForecastWeather;

  @Input() tempUnit!: string;

  forecastWeather: CurrentWeather[] = [];
  focusCellColumnIndex = 0;
  currentPlace = '';
  constructor() {}

  ngOnInit(): void {
    // let { forecastday } = this.weatherForecast.forecast;
    // console.log('forecastday',forecastday)
    // this.forecastWeather = forecastday.map((foreCastDetails) => {
    //   let forecastData: CurrentWeather = {};
    //   const { day, date } = foreCastDetails;
    //   const datObj = new Date(date);
    //   const { condition } = day;
    //   return {
    //     imagePath: `../../../assets/day/${ImageCodeMap[condition.code]}.png`,
    //     date,
    //     day: WEEKDAY[datObj.getDay()].slice(0, 3),
    //     weatherDescription: condition.text,
    //     mintempCelsius: day.mintemp_c,
    //     maxtempCelsius: day.maxtemp_c,
    //     mintempFahrenheit: day.mintemp_f,
    //     maxtempFahrenheit: day.maxtemp_f,
    //   };
    // });
    // console.log('forecastWeather',this.forecastWeather)
    this.currentPlace = this.weatherForecast.city.name;
    let forecastday = this.weatherForecast.list;
    this.forecastWeather = forecastday.map((foreCastDetails: List) => {
      let forecastData: CurrentWeather = {};
      // const { day, date } = foreCastDetails;
      const datObj = convertToDate(foreCastDetails.dt * 1000);
      // const { condition } = day;
      const weather = foreCastDetails.weather[0];
      return {
        imagePath: `http://openweathermap.org/img/w/${weather.icon}.png`,
        datObj,
        day: WEEKDAY[datObj.getDay()].slice(0, 3),
        weatherDescription: weather.description,
        mintempFahrenheit: foreCastDetails.temp.min,
        maxtempFahrenheit: foreCastDetails.temp.max,
        mintempCelsius: convertToCelsius(foreCastDetails.temp.min),
        maxtempCelsius: convertToCelsius(foreCastDetails.temp.max),
      };
    });
  }

  clickLeft(){
    this.focusCellColumnIndex =
        (this.focusCellColumnIndex - 1 + this.forecastWeather.length) % this.forecastWeather.length;
        this.focusCellColumnIndex = (this.focusCellColumnIndex + 1) % this.forecastWeather.length;
  }
  clickRightt(){
    this.focusCellColumnIndex = this.focusCellColumnIndex = (this.focusCellColumnIndex + 1) % this.forecastWeather.length;
  }
}
