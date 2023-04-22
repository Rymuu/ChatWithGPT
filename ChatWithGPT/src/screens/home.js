import React, { useState } from 'react';
import styled from 'styled-components/native';
import LoginForm from '../components/LoginForm/LoginForm';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
const Home = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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

export default Home;
