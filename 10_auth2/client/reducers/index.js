import { combineReducers } from 'redux';

function users(state = [], action) {
  switch (action.type) {
    case 'FETCHED_USERS':
      return action.payload.results;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  users
});

export default rootReducer;