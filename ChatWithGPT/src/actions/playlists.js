import axios from 'axios';

export const FETCH_PLAYLISTS_REQUEST = 'FETCH_PLAYLISTS_REQUEST';
export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS';
export const FETCH_PLAYLISTS_FAILURE = 'FETCH_PLAYLISTS_FAILURE';
import {getToken} from './user';
import {useDispatch, useSelector} from 'react-redux';


const dispatch = useDispatch();

useEffect(() => {
  dispatch(getToken());
}, []);
export const fetchPlaylistsRequest = () => {
  return {
    type: FETCH_PLAYLISTS_REQUEST,
  };
};

export const fetchPlaylistsSuccess = playlists => {
  return {
    type: FETCH_PLAYLISTS_SUCCESS,
    payload: playlists,
  };
};

export const fetchPlaylistsFailure = error => {
  return {
    type: FETCH_PLAYLISTS_FAILURE,
    payload: error,
  };
};

export const fetchPlaylists = () => {
  const token = useSelector(state => state.user.accessToken);
  return dispatch => {
    dispatch(fetchPlaylistsRequest());
    axios
      .get('https://api.spotify.com/v1/browse/featured-playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const playlists = response.data;
        console.log("Reponse : ",response);
        dispatch(fetchPlaylistsSuccess(playlists));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchPlaylistsFailure(errorMsg));
      });
  };
};