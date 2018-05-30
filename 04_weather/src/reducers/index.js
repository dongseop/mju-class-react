import { combineReducers } from 'redux';
import WeatherReducer from './weather_reducer';

const rootReducer = combineReducers({
  weather: WeatherReducer,
});

export default rootReducer;