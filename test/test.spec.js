import React from 'react';
import DisplayWeather from '../src/components/DisplayWeather';
import App from '../src/App';

describe('DisplayWeather', () => {
  const weather = {
    'cloudtotal_pct': '50',
    'feelslike_c': '12.09',
    'humid_pct': '94',
    'temp_c': '13',
    'windspd_kmh': '11',
    'wx_desc': 'Partly cloudy',
    'wx_icon': 'PartlyCloudyNight.gif'
  };
  const wrapper = shallow(<DisplayWeather
                            currentWeatherObj={{}}
                            loading={true}
                            error={false}
                          />
  );

  it('DisplayWeather renders', () => {
    expect(wrapper).to.exist;
  });

  wrapper.setProps({ currentWeatherObj:weather, loading:false, error:false  });

  it('renders 6 <p>s and 4 <h4>s', () => {
    expect(wrapper.find('p')).to.have.length(6);
    expect(wrapper.find('h4')).to.have.length(4);
  });

  it('Generate correct states when receiving props change', () => {
    expect(wrapper.state('totalCloud')).to.equal('50');
    expect(wrapper.state('feelLikeTemp')).to.equal('12.09');
    expect(wrapper.state('humidity')).to.equal('94');
    expect(wrapper.state('temperature')).to.equal('13');
    expect(wrapper.state('maxWindSpeed')).to.equal('11');
    expect(wrapper.state('description')).to.equal('Partly cloudy');
    expect(wrapper.state('imageIcon')).to.equal('PartlyCloudyNight');
  });
})

describe('App', () => {
  const wrapper = shallow(<App />);

  it('App renders', () => {
    expect(wrapper).to.exist;
  });

  it('calls componentWillMount', () => {
    spy(App.prototype, 'componentWillMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  it('Generate activeNavs states when clicking on tabs', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.state('activeNavs')[1]).to.equal(true);
  });
})
