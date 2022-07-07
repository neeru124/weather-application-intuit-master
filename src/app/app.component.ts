import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ForecastWeather } from './interfaces/rapidAPIforecast.model';
import { PresentWeather } from './interfaces/rapidAPIWeather.model';
import { Weather } from './interfaces/weather.model';
import { WeatherService } from './services/weather.service';
import { convertToKM } from './utils/weatherUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = "What's The Weather";
  weatherForm!: FormGroup;
  weatherData!: Weather;
  presentWeatherData!: PresentWeather;
  futureWeatherData!: ForecastWeather;

  currentPlace = '';
  isLocationAvailable = false;
  currLat = 0;
  currLng = 0;
  errMsg = 'Please enter a city or zipcode';
  showErrMsg = false;
  showCurrWeather = false;
  showForecastWeather = false;
  currTempMode = 'celcius'; // farenheit
  currWindMode = 'MILES'; // KM,MILES

  constructor(private fb: FormBuilder, private weatherDetail: WeatherService) {
    this.weatherForm = this.fb.group({
      city: '',
      zipcode: '',
    });
  }

  ngOnInit() {
    console.log(localStorage.getItem('cityName'));
    if (localStorage.getItem('cityName')) {
      console.log('localStorage');
      this.showWeather(0, localStorage.getItem('cityName'), undefined);
    } else if (localStorage.getItem('zipcode')) {
      console.log('localStorage');

      this.showWeather(0, undefined, localStorage.getItem('zipcode'));
    } else {
      this.getCurrentLocation();
    }
  }
  toggleTemp(ev: any) {
    console.log(ev.target.value);
    this.currTempMode = ev.target.value;
  }
  toggleWind(ev: any) {
    console.log(ev.target.value);
    this.currWindMode = ev.target.value;
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      this.isLocationAvailable = true;
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        this.weatherDetail
          .getCurrentLocationName(this.currLat, this.currLng)
          .subscribe((res) => {
            console.log('ressssssssssssssss', res);
            this.currentPlace = res[0].name;
            localStorage.setItem('cityName', this.currentPlace);
            this.showWeather(0, localStorage.getItem('cityName'), undefined);
          });
      });
    } else {
      this.isLocationAvailable = false;
      alert('Geolocation is not supported by this browser.');
    }
  }

  onSubmit(form: FormGroup, days?: string) {
    console.log('onSubmit called');
    this.isLocationAvailable = true;
    if (
      !form.value.city &&
      !form.value.zipcode &&
      localStorage.getItem('cityName') &&
      localStorage.getItem('zipcode')
    ) {
      this.showErrMsg = true;
    } else {
      this.showErrMsg = false;
    }
    let noOfDays = 0;
    if (days) {
      noOfDays = 10;
    }

    if (form.value.city) {
      this.showWeather(noOfDays, form.value.city, undefined);
      localStorage.setItem('cityName', form.value.city);
      localStorage.removeItem('zipcode');
    } else {
      this.showWeather(noOfDays, undefined, form.value.zipcode);
      localStorage.setItem('zipcode', form.value.zipcode);
      localStorage.removeItem('cityName');
    }
  }

  showWeather(noOfDays: number, city: any, zipcode: any) {
    // this.weatherDetail
    //   .getWeatherData(noOfDays, city, zipcode)
    //   .subscribe((response: Weather) => {
    //     this.weatherData = response;
    //     console.log(this.weatherData);
    //     if (noOfDays > 0) {
    //       this.showCurrWeather = true;
    //       this.showForecastWeather = true;
    //     } else {
    //       this.showCurrWeather = true;
    //       this.showForecastWeather = false;
    //     }
    //   });
    if (noOfDays > 0) {
      this.weatherDetail
        .getRapidForecasttWeather(city, zipcode)
        .subscribe((response: ForecastWeather) => {
          this.futureWeatherData = response;
          console.log(this.weatherData);
          if (noOfDays > 0) {
            this.showCurrWeather = false;
            this.showForecastWeather = true;
          }
        });
    } else {
      this.weatherDetail
        .getRapidCurrentWeather(city, zipcode)
        .subscribe((response: PresentWeather) => {
          this.presentWeatherData = response;
          console.log(this.weatherData);
          if (noOfDays > 0) {
            this.showCurrWeather = true;
            this.showForecastWeather = true;
          } else {
            this.showCurrWeather = true;
            this.showForecastWeather = false;
          }
        });
    }
  }
  updateCurrPlaceWeather() {
    this.weatherDetail
      .getCurrWeatherData(0, this.currentPlace)
      .subscribe((res: Weather) => {
        this.weatherData = res;
        console.log(this.currentPlace, res);
        this.showWeather(0, this.currentPlace, undefined);
      });
  }
}
