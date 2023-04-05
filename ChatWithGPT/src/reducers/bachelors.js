import {DISPLAY_CHARACTERS} from '../actions/bachelors';

const initialState = {
  characters: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    default:
      return state;
  }
};
