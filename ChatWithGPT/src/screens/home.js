import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import LoginForm from '../components/LoginForm/LoginForm';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import notifee from '@notifee/react-native';
import { PermissionsAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';
const Home = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera, gallery, and microphone');
      } else {
        console.log('Camera, gallery, or microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this ChatWithGtp: https://example.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    axios
      .post('http://ADRESSE_IPV4:1337/api/auth/local', {
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
            <RegisterButtonText>{t('buttonRegister')}</RegisterButtonText>
          </RegisterButton>
          <LoginForm handleLogin={handleLogin} />
          <ShareButton onPress={handleSharePress}>
            <ShareIcon source={require('../icones/share.png')} />
            <ShareButtonText>Share</ShareButtonText>
          </ShareButton>
          <NotificationButton onPress={() => onDisplayNotification()}>
            <NotificationButtonText>{t('notification')}</NotificationButtonText>
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

const ShareButton = styled.TouchableOpacity`
  background-color:  ${props => props.theme.secondaryColor};
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  align-items: center;
  flex-direction: row;
`;

const ShareButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

const ShareIcon = styled.Image`
  width: 25px;
  height: 25px;
  tint-color: #FFFFFF;
`;
export default Home;
