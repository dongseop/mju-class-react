import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather({city, list}) {
    const temps = list.map(e => (e.main.temp - 273.15));
    const pressures = list.map(e => e.main.temp);
    const humidities = list.map(e => e.main.temp);
    return (
      <tr key={city.id}>
        <td>
          <GoogleMap lat={city.coord.lat} lng={city.coord.lon}/>
        </td>
        <td><Chart data={temps} color='orange' units='&#x2103;'/></td>
        <td><Chart data={pressures} color='green' units='hPa'/></td>
        <td><Chart data={humidities} color='black' units='%'/></td>
      </tr>
    );
  }
  handleError() {
    if (this.props.error) {
      return (
        <div className="alert alert-danger" role="alert">
          {this.props.error.message}
        </div>
      );
    }
  }
  render() {
    return (
      <div className='weather-list' >
        { this.handleError() }
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (&#x2103;)</th>
              <th>Pressure (hPa)</th>
              <th>Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.weather.map(this.renderWeather)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    weather: state.weather.data,  
    error: state.weather.error
  };
}

export default connect(mapStateToProps)(WeatherList);