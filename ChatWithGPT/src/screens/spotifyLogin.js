import React, {useState, useEffect} from 'react';
import {Button, View, Text, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import base64 from 'react-native-base64';
import {saveUser, saveToken} from '../actions/user';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID = '7c76262f71ee4a1c81f5a7dfcd00ea66';
const CLIENT_SECRET = '4c543fd27da54148b534e6098f1d77ef';
const REDIRECT_URI = 'myapp://spotify-auth-callback';

const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-private,playlist-modify-public`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  margin-bottom: 20px;
`;

const UserInfo = styled.Text`
  color: black;
`;

const SpotifyLogin = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const token = useSelector(state => state.user.accessToken);

  useEffect(() => {
    const handleOpenURL = async event => {
      const code = event.url.split('code=')[1];
      if (code) {
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          null,
          {
            params: {
              grant_type: 'authorization_code',
              code,
              redirect_uri: REDIRECT_URI,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${base64.encode(
                `${CLIENT_ID}:${CLIENT_SECRET}`,
              )}`,
            },
          },
        );
        const {access_token} = response.data;
        setAccessToken(access_token);
      }
    };
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  useEffect(() => {
    if (accessToken !== null && Object.keys(user).length === 0) {
      AsyncStorage.setItem('accessToken', accessToken);
      dispatch(saveToken(accessToken));
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // Récupérer les informations de l'utilisateur
      axios
        .get('https://api.spotify.com/v1/me', {headers})
        .then(userResponse => {
          dispatch(saveUser(userResponse.data));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [accessToken]);

  return (
    <Container>
      {!accessToken && (
        <ButtonWrapper>
          <Button
            title="Se connecter à Spotify"
            onPress={() => Linking.openURL(authURL)}
          />
        </ButtonWrapper>
      )}
      {accessToken && (
        <>
          {user && (
            <UserInfo>
              Connecté en tant que : {user.display_name} ({user.email})
            </UserInfo>
          )}
        </>
      )}
    </Container>
  );
};

export default SpotifyLogin;