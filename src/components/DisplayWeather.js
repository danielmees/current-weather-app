import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { weatherIcons, weatherIconLookup } from './constants/LoadIcons';
import WindCompassIcon from '../../images/windcompass.png';
import style from './Style.css';

class DisplayWeather extends Component {
  constructor() {
    super();
    this.state = {
      imageIcon: '',
      temperature: '',
      feelLikeTemp: '',
      description: '',
      maxWindSpeed: '',
      windComesFrom: '',
      totalCloud: '',
      humidity: '',
      dewPoint: '',
      visibility: '',
      seaLevelPressure: '',
      loading: true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      imageIcon: nextProps.currentWeatherObj.wx_icon.split('.')[0],
      temperature: nextProps.currentWeatherObj.temp_c,
      feelLikeTemp: nextProps.currentWeatherObj.feelslike_c,
      description: nextProps.currentWeatherObj.wx_desc,
      maxWindSpeed: nextProps.currentWeatherObj.windspd_kmh,
      windComesFrom: nextProps.currentWeatherObj.winddir_compass,
      totalCloud: nextProps.currentWeatherObj.cloudtotal_pct,
      humidity: nextProps.currentWeatherObj.humid_pct,
      dewPoint: nextProps.currentWeatherObj.dewpoint_c,
      visibility: nextProps.currentWeatherObj.vis_km,
      seaLevelPressure: nextProps.currentWeatherObj.slp_mb,
      loading: false
    });
  }

  render() {
    let imageIconIndex;
    if (this.state.imageIcon !== '') {
      imageIconIndex = weatherIconLookup.indexOf(this.state.imageIcon);
    }

    return (
      <Grid fluid className={style.container}>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <h2>Current Weather Report</h2>
          </Col>
        </Row>
        {!this.state.loading &&
          <Row>
            <Col xs={12} sm={6} md={6}>
              <img src={weatherIcons[imageIconIndex]} />
              <div>
                <p>{this.state.temperature}&#8451;</p>
                <p>Feels like {this.state.feelLikeTemp}&#8451;</p>
                <p>{this.state.description}</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6}>
              <img src={WindCompassIcon} />
              <p>{this.state.maxWindSpeed} km/h</p>
              <p>Comes from {this.state.windComesFrom}</p>
            </Col>
            <Col xs={12} sm={6} md={6}>
              <p>Total Cloud</p>
              <div className="progress align-middle" style={{height:'20px', width:'300px'}}>
                <div className="progress-bar align-middle" role="progressbar"
                  style={{width:`${this.state.totalCloud}%`,fontSize:'20px'}}
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                >
                  <span className="align-middle">{this.state.totalCloud}%</span>
                </div>
              </div>
              <p>Humidity</p>
              <div className="progress align-middle" style={{height:'20px', width:'300px'}}>
                <div className="progress-bar align-middle" role="progressbar"
                  style={{width:`${this.state.humidity}%`,fontSize:'20px'}}
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                >
                  <span className="align-middle">{this.state.humidity}%</span>
                </div>
              </div>
            </Col>
            <Col>
              <Col xs={12} sm={6} md={6}>
                <p>Dew Point</p>
                <p>{this.state.dewPoint}&#8451;</p>
                <p>visibility</p>
                <p>{this.state.visibility}km</p>
                <p>Sea Level Pressure</p>
                <p>{this.state.seaLevelPressure}mb</p>
              </Col>
            </Col>
          </Row>
        }
      </Grid>
    );
  }
}

DisplayWeather.propTypes = {
  currentWeatherObj: PropTypes.object.isRequired,
};

export default DisplayWeather;
