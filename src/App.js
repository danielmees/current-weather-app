import React, { Component } from 'react';
import axios from 'axios';
import DisplayWeather from './components/DisplayWeather';
import style from './Style.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentWeatherObj: {}
    }
  }

  fetchWeatherData(postcode) {
    self = this;
    axios.get(`http://api.weatherunlocked.com/api/current/au.${postcode}?app_id=930fc96a&app_key=bd8f96bc469b5f3a186a7b87da0f8ddd`)
        .then(function (response) {
          self.setState({ currentWeatherObj: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  componentWillMount() {
    this.fetchWeatherData('3000');
  }


  render() {
    return (
      <div>
      <div className={style.tab}>
        <button onClick={() => { this.fetchWeatherData('3000') }}>Melbourne</button>
        <button onClick={() => { this.fetchWeatherData('2000') }}>Sydney</button>
        <button onClick={() => { this.fetchWeatherData('4000') }}>Brisbane</button>
      </div>
        <DisplayWeather currentWeatherObj={this.state.currentWeatherObj} />
      </div>
    );
  }
}
