import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { RingLoader } from 'react-spinners';
import { weatherIcons, weatherIconLookup } from './constants/LoadIcons';
import WindCompassIcon from '../../images/WindCompass.png';
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
      loading: true,
      error: false,
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
      loading: nextProps.loading,
      error: nextProps.error
    });
  }

  render() {
    let imageIconIndex;
    if (this.state.imageIcon !== '') {
      imageIconIndex = weatherIconLookup.indexOf(this.state.imageIcon);
    }

    return (
      <Grid fluid className={style.container}>
        <Row className={style.titleContainer}>
          <Col xs={12} sm={12} mdOffset={1} md={10}>
            <h1>Current Weather Report</h1>
          </Col>
        </Row>
        {this.state.loading &&
          <Row>
            <Col xsOffset={3} xs={6} smOffset={5} sm={2} mdOffset={5} md={2}>
              <RingLoader size={200} color="#000000"
                loading={true}
              />
            </Col>
          </Row>
        }
        {!this.state.loading && this.state.error &&
          <Row>
          <Col xs={12} sm={12} mdOffset={1} md={10}>
            <h3>Oops! Something went wrong! please try again.</h3>
          </Col>
          </Row>
        }
        {!this.state.loading && !this.state.error &&
          <Row>
            <Col xs={12} sm={6} mdOffset={1} md={5}>
              <div className={style.contentContainer}>
                <div className={style.tableContainer}>
                  <img src={weatherIcons[imageIconIndex]} />
                  <div>
                    <h4>Temperature &nbsp; {this.state.temperature}&#8451;</h4>
                    <p>Feels like {this.state.feelLikeTemp}&#8451;</p>
                    <p>{this.state.description}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={5}>
              <div className={style.contentContainer}>
                <div className={style.tableContainer}>
                  <img src={WindCompassIcon} />
                  <div>
                    <h4>Wind &nbsp; {this.state.maxWindSpeed} km/h</h4>
                    <p>Comes from {this.state.windComesFrom}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} mdOffset={1} md={5}>
              <div className={style.contentContainer}>
                <div className={style.listContainer}>
                  <h4>Total Cloud</h4>
                  <div className="progress align-middle" className={style.progressBar}>
                    <div className="progress-bar align-middle"
                      style={{width:`${this.state.totalCloud}%`,fontSize:'18px'}}
                    >
                      <span className="align-middle">{this.state.totalCloud}%</span>
                    </div>
                  </div>
                  <h4>Humidity</h4>
                  <div className="progress align-middle" className={style.progressBar}>
                    <div className="progress-bar align-middle"
                      style={{width:`${this.state.humidity}%`,fontSize:'18px'}}
                    >
                      <span className="align-middle">{this.state.humidity}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={5}>
              <div className={style.contentContainer}>
                <div className={style.listContainer}>
                  <p><span>Dew Point</span> &nbsp; {this.state.dewPoint}&#8451;</p>
                  <p><span>visibility</span> &nbsp; {this.state.visibility}km</p>
                  <p><span>Sea Level Pressure</span> &nbsp; {this.state.seaLevelPressure}mb</p>
                </div>
              </div>
            </Col>
          </Row>
        }
      </Grid>
    );
  }
}

DisplayWeather.propTypes = {
  currentWeatherObj: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default DisplayWeather;
