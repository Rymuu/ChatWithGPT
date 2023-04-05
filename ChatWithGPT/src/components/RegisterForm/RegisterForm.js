import React, { useState } from 'react';
import styled from 'styled-components/native';

const RegisterForm = ({ handleRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    handleRegister(username, email, password);
  };

  return (
    <Container>
      <Title>Inscription</Title>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handlePress}>
        <ButtonText>S'inscrire</ButtonText>
      </Button>
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

export default RegisterForm;