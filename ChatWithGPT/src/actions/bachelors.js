import axios from 'axios';

export const DISPLAY_CHARACTERS = 'DISPLAY_CHARACTERS';

export const displayCharacters = characters => ({
  type: DISPLAY_CHARACTERS,
  payload: characters,
});

export const getCharacters = () => dispatch => {
  axios({
    method: 'GET',
    url: 'https://api.disneyapi.dev/characters?page=7&pageSize=25',
  })
    .then(res => {
      console.log(res.data.data);
      dispatch(displayCharacters(res.data.data));
    })
    .catch(err => err);
};
