import AsyncStorage from '@react-native-async-storage/async-storage';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const saveToken = token => {
  return {
    type: 'SAVE_TOKEN',
    payload: token,
  };
};

export const saveUser = user => {
  return {
    type: 'SAVE_USER',
    payload: user,
  };
};

export const getToken = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token !== null) {
      dispatch(saveToken(token));
    }
  };
};
