import axios from 'axios';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const sendMessage = message => async dispatch => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: `Réponds de manère concise. ${message}`}],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer CLE_API`,
        },
      },
    );
    dispatch(addMessage({user: 'user', message}));

    dispatch(
      addMessage({user: 'bot', message: response.data.choices[0].message.content.trim()}),
    );
  } catch (error) {
  }
};