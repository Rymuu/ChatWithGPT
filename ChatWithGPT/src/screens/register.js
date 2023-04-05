import React, { useState } from 'react';
import styled from 'styled-components/native';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    axios
      .post('http://172.29.144.1:1337/api/auth/local/register', {
        username: username,
        email: email,
        password: password,
      })
      .then(response => {
        setLoading(false);
        if (response && response.data) {
          showMessage({
          message: 'Inscription réussie',
          description: 'Vous pouvez maintenant vous connecter',
          type: 'success',
          icon: 'auto'
        });
          navigation.navigate('Home');
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
          console.log(error.response.data);
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
      <FlashMessage position="top"/>
      {loading ? (
        <ActivityIndicator size="large" color="#6b46c1" />
      ) : (
        <>
          <RegisterButton onPress={() => navigation.navigate('Home')}>
            <RegisterButtonText>Login</RegisterButtonText>
          </RegisterButton>
          <RegisterForm handleRegister={handleRegister} />
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

export default Register;
