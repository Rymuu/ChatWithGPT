import {combineReducers} from 'redux';
import chat from './chat';
import user from './user';
import playlists from './playlists';
export default combineReducers({
  chat,
  user,
  playlists,
});
