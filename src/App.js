import React, { Component } from 'react';
import axios from 'axios';
import Clear from '../images/Clear.png';
import PartlyCloudyDay from '../images/PartlyCloudyDay.png';

export const weatherIcons = [Clear, PartlyCloudyDay];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentWeatherObj: {}
    }
  }

  componentWillMount() {
    self = this;
    axios.get('http://api.weatherunlocked.com/api/current/au.7000?app_id=930fc96a&app_key=bd8f96bc469b5f3a186a7b87da0f8ddd')
        .then(function (response) {
          self.setState({ currentWeatherObj: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  render() {
    return (
      <div>current weather</div>
    );
  }
}
