import {SAVE_USER, SAVE_TOKEN} from '../actions/user';

const initialState = {
  accessToken: null,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return {...state, accessToken: action.payload};
    case 'SAVE_USER':
      return {...state, user: action.payload};
    default:
      return state;
  }
};

export default userReducer;