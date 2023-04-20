import {
  FETCH_PLAYLISTS_REQUEST,
  FETCH_PLAYLISTS_SUCCESS,
  FETCH_PLAYLISTS_FAILURE,
} from '../actions/playlists';

const initialState = {
  loading: false,
  playlists: [],
  error: '',
};

const playlistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYLISTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PLAYLISTS_SUCCESS:
      return {
        loading: false,
        playlists: action.payload,
        error: '',
      };
    case FETCH_PLAYLISTS_FAILURE:
      return {
        loading: false,
        playlists: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default playlistsReducer;
