import {combineReducers} from 'redux';
import bachelors from './bachelors';
import chat from './chat';

export default combineReducers({
  bachelors,
  chat,
});
