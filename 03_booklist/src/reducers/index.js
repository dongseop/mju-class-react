import { combineReducers } from 'redux';
import books from './books_reducer';
import selected from './selected_reducer';

const rootReducer = combineReducers({
  books,
  selected
});

export default rootReducer;

