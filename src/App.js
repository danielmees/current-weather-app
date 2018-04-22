import React, { Component } from 'react';
import axios from 'axios';
import DisplayWeather from './components/DisplayWeather';
import style from './Style.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentWeatherObj: {},
      loading: true,
      error: false,
      activeNavs: [true, false, false]
    }
  }

  fetchWeatherData(postcode) {
    self = this;
    self.setState({ loading: true, error: false });
    axios.get(`http://api.weatherunlocked.com/api/current/au.${postcode}?app_id=930fc96a&app_key=bd8f96bc469b5f3a186a7b87da0f8ddd`)
      .then(function (response) {
        self.setState({ currentWeatherObj: response.data, loading: false });
      })
      .catch(function (error) {
        self.setState({ error: true, loading: false });
      });
  }

  componentWillMount() {
    this.fetchWeatherData('3000');
  }

  handleNavClick (index) {
    self = this;
    const activeNavs = [];
    self.state.activeNavs.forEach((value, i) => {
      if (index === i) {
        activeNavs.push(true);
      } else {
        activeNavs.push(false);
      }
    });
    self.setState({ activeNavs });
  }


  render() {
    return (
      <div>
      <div className={style.tab}>
        <button
          className={this.state.activeNavs[0] ? style.active : ''}
          onClick={() => { this.fetchWeatherData('3000'); this.handleNavClick(0); }}
        >Melbourne</button>
        <button
          className={this.state.activeNavs[1] ? style.active : ''}
          onClick={() => { this.fetchWeatherData('2000'); this.handleNavClick(1); }}
        >Sydney</button>
        <button
          className={this.state.activeNavs[2] ? style.active : ''}
          onClick={() => { this.fetchWeatherData('4000'); this.handleNavClick(2); }}
        >Brisbane</button>
      </div>
        <DisplayWeather
          currentWeatherObj={this.state.currentWeatherObj}
          loading={this.state.loading}
          error={this.state.error}
        />
      </div>
    );
  }
}
