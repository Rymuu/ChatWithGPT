import axios from 'axios';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const sendMessage = message => async dispatch => {
  console.log('message', message);
  try {
    console.log('message', message);
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        prompt: `\n\n${message}`,
        max_tokens: 64,
        temperature: 0,
        model: 'text-davinci-003',
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer CLE_API`,
        },
      },
    );
    console.log('response:', response);
    dispatch(addMessage({user: 'user', message}));
    console.log(
      'response.data.choices[0].text.trim():',
      response.data.choices[0].text.trim(),
    );
    dispatch(
      addMessage({user: 'bot', message: response.data.choices[0].text.trim()}),
    );
  } catch (error) {
    console.log(error);
  }
};