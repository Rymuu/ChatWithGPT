import {combineReducers} from 'redux';
import bachelors from './bachelors';
import chat from './chat';
import user from './user';
import playlists from './playlists';
export default combineReducers({
  bachelors,
  chat,
  user,
  playlists,
});