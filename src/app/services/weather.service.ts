import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentLocation } from '../interfaces/location.model';
import { Weather } from '../interfaces/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  key: string = '92ae9e756e8b4c56a20175408222306';
  params: HttpParams = new HttpParams();
  headers = new HttpHeaders({
    'x-rapidapi-key': '5f21bc5267msh69958837d3d65e4p1886c3jsne27cd343921a',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  });
  currentLocation: string = '';
  constructor(private http: HttpClient) {
    this.params = this.params.set('key', this.key);
  }
  
  getWeatherData(noOfDays: number, cityName?: string, postalCode?: number) {
    console.log('In method');
    console.log('noOfDays', noOfDays);
    if (cityName) {
      this.params = this.params.set('q', cityName);
    } else if (postalCode) {
      this.params = this.params.set('q', postalCode);
    } else {
      this.params = this.params.set('q', 'Ludhiana');
    }

    console.log(this.params);
    if (noOfDays) {
      this.params = this.params.set('days', noOfDays);
      // Testing with API
      return this.http.post<Weather>('https://api.weatherapi.com/v1/forecast.json',this.params);
      
      // Local Testing without API
      // return this.forecastResponseForGoa;
    } else {
      
      // Testing with API
      return this.http.post<Weather>(
        'https://api.weatherapi.com/v1/current.json',
        this.params
      );
      // Local Testing without API
      // return data;
    }
  }

  getCurrentLocationName(latitude: number, longitude: number) {
    this.params = this.params.set('q', latitude + ',' + longitude);
    return this.http.post<CurrentLocation[]>(
      'https://api.weatherapi.com/v1/search.json?key=92ae9e756e8b4c56a20175408222306',
      this.params
    );
    // .subscribe((response:CurrentLocation[])=>{
    // this.currentLocation = response[0].name;
    // return this.currentLocation;
    // })
  }
  getCurrWeatherData(noOfDays: number, cityName?: string, postalCode?: number) {
    console.log('In method', cityName);
    if (cityName) {
      this.params = this.params.set('q', cityName);
    } else if (postalCode) {
      this.params = this.params.set('q', postalCode);
    } else {
      this.params = this.params.set('q', 'Ludhiana');
    }
    console.log(this.params);
    return this.http.post<Weather>(
      'https://api.weatherapi.com/v1/current.json',
      this.params
    );
  }

  getRapidCurrentWeather(cityName?: string, postalCode?: number){
    if (cityName) {
      this.params = this.params.set('q', cityName);
    } else if (postalCode) {
      this.params = this.params.set('q', postalCode);
    } else {
      this.params = this.params.set('q', 'Ludhiana');
    }
      this.params = this.params.set('units', 'imperial');

    return this.http.get<any>('https://community-open-weather-map.p.rapidapi.com/weather',{
      headers:this.headers,params:this.params
    });
    // return this.http.get<any>('https://mocki.io/v1/67c486d3-8099-4c42-ad91-940532810f68');
  }
  getRapidForecasttWeather(cityName?: string, postalCode?: number){
    if (cityName) {
      this.params = this.params.set('q', cityName);
    } else if (postalCode) {
      this.params = this.params.set('q', postalCode);
    } else {
      this.params = this.params.set('q', 'Ludhiana');
    }
      this.params = this.params.set('units', 'imperial');

    return this.http.get<any>('https://community-open-weather-map.p.rapidapi.com/forecast/daily',{
        headers:this.headers,params:this.params
      });
      // return this.http.get<any>('https://mocki.io/v1/1a121c02-87fb-4749-ade9-921535bc6926');
  }
}
