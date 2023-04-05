import React, { useState } from 'react';
import styled from 'styled-components/native';
import LoginForm from '../components/LoginForm/LoginForm';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import notifee from '@notifee/react-native';
const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    axios
      .post('http://172.29.144.1:1337/api/auth/local', {
        identifier: email,
        password: password,
      })
      .then(response => {
        setLoading(false);
        if (response && response.data) {
          AsyncStorage.setItem('token', response.data.jwt);
          navigation.navigate('Chat');
        } else {
          showMessage({
            message: 'Erreur',
            description: 'Réponse invalide',
            type: 'danger',
            icon: 'auto'
          });
        }
      })
      .catch(error => {
        setLoading(false);
        if (error && error.response && error.response.data) {
          showMessage({
            message: 'Erreur',
            description: error.response.data.error.message,
            type: 'danger',
            icon: 'auto'
          });
        } else {
          showMessage({
            message: 'Erreur',
            description: 'Réponse d\'erreur invalide',
            type: 'danger',
            icon: 'auto'
          });
        }
      });
  };
  async function onDisplayNotification() {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Défis tes amis !',
      body: 'Tu aime la musique ? Alors tu viens jouer avec tes maintenant !',
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === 'notification-action-press') {
    }
  });

  return (
    <Container>
      <FlashMessage position="top" />
      {loading ? (
        <ActivityIndicator size="large" color="#6b46c1" />
      ) : (
        <>
          <RegisterButton onPress={() => navigation.navigate('Register')}>
            <RegisterButtonText>Créer un compte</RegisterButtonText>
          </RegisterButton>
          <LoginForm handleLogin={handleLogin} />
          <NotificationButton onPress={() => onDisplayNotification()}>
            <NotificationButtonText>Notification</NotificationButtonText>
          </NotificationButton>
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primaryColor};
`;

const RegisterButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const RegisterButtonText = styled.Text`
  color: ${props => props.theme.secondaryColor};
  font-size: 16px;
  font-weight: bold;
`;

const NotificationButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const NotificationButtonText = styled.Text`
  color: ${props => props.theme.secondaryColor};
  font-size: 16px;
  font-weight: bold;
`;

export default Home;
