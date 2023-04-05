import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage} from '../actions/chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/home';
const Chat = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);
  const [inputValue, setInputValue] = useState('');

  useFocusEffect(() => {
    //AsyncStorage.removeItem('token');
    AsyncStorage.getItem('token')
      .then(token => {
        if (!token) {
          navigation.navigate('Home');
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  const handleInputChange = value => {
    setInputValue(value);
  };

  const handleSendMessage = () => {
    dispatch(sendMessage(inputValue));
    setInputValue('');
  };

  return (
    <Container>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} user={message.user}>
            <MessageText user={message.user}>{message.message}</MessageText>
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          placeholder="Type a message..."
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <SendButton onPress={handleSendMessage}>
          <SendButtonText>Send</SendButtonText>
        </SendButton>
      </InputContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primaryColor};
`;

const MessagesContainer = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const Message = styled.View`
  background-color: ${({user, theme}) => (user === 'user' ? theme.secondaryColor : '#fff')};
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 8px;
  max-width: 75%;
  align-self: ${({user}) => (user === 'user' ? 'flex-end' : 'flex-start')};
`;

const MessageText = styled.Text`
  color: ${({user,theme}) => (user === 'user' ? theme.textColor : '#333')};
  font-size: 16px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

const Input = styled.TextInput`
  flex: 1;
  background-color: ${props => props.theme.secondaryColor};
  border-radius: 8px;
  padding: 8px 16px;
  font-size: ${props => props.theme.fontSize};
  margin-right: 16px;
  color: ${props => props.theme.textColor};
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.secondaryColor};
  border-radius: 8px;
  padding: 8px 16px;
`;

const SendButtonText = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: ${props => props.theme.fontSize};
  font-weight: bold;
`;

export default Chat;
