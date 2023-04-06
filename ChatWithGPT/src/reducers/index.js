import {combineReducers} from 'redux';
import bachelors from './bachelors';
import chat from './chat';
import user from './user';

export default combineReducers({
  bachelors,
  chat,
  user,
});