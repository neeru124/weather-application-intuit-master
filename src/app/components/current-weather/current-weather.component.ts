import { Component, Input, OnInit } from '@angular/core';
import { ImageCodeMap } from 'src/app/image-map';
import { CurrentWeather, WEEKDAY } from 'src/app/interfaces/currWeather.model';
import { PresentWeather } from 'src/app/interfaces/rapidAPIWeather.model';
import { Weather } from 'src/app/interfaces/weather.model';
import {
  convertToCelsius as convertToCelsius,
  convertToDate,
  convertToKM,
  imgUrl,
} from 'src/app/utils/weatherUtils';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  // @Input() weatherInfo!:Weather;
  @Input() presentWeatherInfo!: PresentWeather;

  @Input() tempUnit: string = '';
  @Input() windUnit: string = '';

  currWeather: CurrentWeather = {};
  img='';fontColor='black';
  constructor() {}

  ngOnInit(): void {
    console.log('Inside Curr Weather Component', this.currWeather);
    // let imageCode;
    // // commented code for weatherapi.com images
    // for (let key in ImageCodeMap) {
    //   if (key === this.weatherInfo.current.condition.code + '') {
    //     imageCode = ImageCodeMap[key];
    //   }
    // }

    // console.log(' weatherInfo =========>  ',this.weatherInfo);
    // this.currWeather.imagePath = '../../../assets/day/' + imageCode + '.png';
    // console.log(this.currWeather.imagePath);
    // const date = new Date(this.weatherInfo.location.localtime);
    // this.currWeather.day = WEEKDAY[date.getDay()];
    // this.currWeather.date = this.weatherInfo.location.localtime;
    // this.currWeather.humidity = this.weatherInfo.current.humidity ;
    // this.currWeather.pressure = this.weatherInfo.current.pressure_mb ;
    // this.currWeather.tempCelsius = this.weatherInfo.current.temp_c ;
    // this.currWeather.tempFahrenheit = this.weatherInfo.current.temp_f ;
    // this.currWeather.weatherDescription = this.weatherInfo.current.condition.text;
    // this.currWeather.icon = this.weatherInfo.current.condition.icon;
    // this.currWeather.wind_kph = this.weatherInfo.current.wind_kph ;
    // this.currWeather.wind_mph = this.weatherInfo.current.wind_mph ;
    // this.currWeather.feelsLike_c = this.weatherInfo.current.feelslike_c;
    // this.currWeather.feelsLike_f = this.weatherInfo.current.feelslike_f;

    // RAPID API WEATHER CODE
    this.img = imgUrl(this.presentWeatherInfo.weather[0].main);
    if(this.presentWeatherInfo.weather[0].main.toLowerCase()=== 'clouds'){
      this.fontColor = 'white';
    }else {
      this.fontColor = 'black'
    }
    let iconCode = this.presentWeatherInfo.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    this.currWeather.imagePath = iconUrl;
    const date = convertToDate(
      this.presentWeatherInfo.dt * 1000 +
        this.presentWeatherInfo.timezone * 1000
    );
    this.currWeather.day = WEEKDAY[date.getDay()];
    // this.currWeather.date = this.presentWeatherInfo.location.localtime;
    this.currWeather.humidity = this.presentWeatherInfo.main.humidity;
    this.currWeather.pressure = this.presentWeatherInfo.main.pressure;
    this.currWeather.tempFahrenheit = this.presentWeatherInfo.main.temp;
    this.currWeather.tempCelsius = convertToCelsius(
      this.currWeather.tempFahrenheit
    );

    this.currWeather.weatherDescription =
      this.presentWeatherInfo.weather[0].description;
    this.currWeather.icon = iconUrl;
    this.currWeather.wind_mph = this.presentWeatherInfo.wind.speed;
    this.currWeather.wind_kph = convertToKM(
      this.currWeather.wind_mph
    );
    this.currWeather.feelsLike_f = this.presentWeatherInfo.main.feels_like;

    this.currWeather.feelsLike_c = convertToCelsius(
      this.presentWeatherInfo.main.feels_like
    );
  }
}
