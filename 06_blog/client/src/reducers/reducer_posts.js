import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST + '_FULFILLED':
      return _.omit(state, action.payload);
    case FETCH_POST + '_FULFILLED':
      return { ...state, [action.payload.data.id]: action.payload.data};
    case FETCH_POSTS + '_FULFILLED':
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}