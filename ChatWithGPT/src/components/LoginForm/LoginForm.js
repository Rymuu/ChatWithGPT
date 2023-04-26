import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { PermissionsAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Share } from 'react-native';
import notifee from '@notifee/react-native';
const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {t} = useTranslation();
  const handlePress = () => {
    handleLogin(email, password);
  };
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSharePress = async () => {
    try {
      await Share.share({
        message: 'Check out this ChatWithGtp: https://example.com',
      });
    } catch (error) {
    }
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
      <Title>{t('titleConnexion')}</Title>
      <TextInput
        placeholder={t('email')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handlePress}>
        <ButtonText>{t('buttonLogin')}</ButtonText>
      </Button>
      <ShareButton onPress={handleSharePress}>
        <ShareIcon source={require('../../icones/share.png')} />
        <ShareButtonText>Share</ShareButtonText>
      </ShareButton>
      <NotificationButton onPress={() => onDisplayNotification()}>
        <NotificationButtonText>{t('notification')}</NotificationButtonText>
      </NotificationButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.secondaryColor};
`;

const TextInput = styled.TextInput`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.secondaryColor};
  font-size: 16px;
  color: ${props => props.theme.secondaryColor};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.secondaryColor};
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.textColor};
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
`;

const NotificationButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const NotificationButtonText = styled.Text`
  color: ${props => props.theme.secondaryColor};
  font-size: 16px;
  font-weight: bold;
`;

export default LoginForm;