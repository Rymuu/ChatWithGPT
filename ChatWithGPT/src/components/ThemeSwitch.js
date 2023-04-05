import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from '../context/ThemeContext';
import { Switch } from 'react-native';
import { darkTheme } from '../config/theme';
const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Container>
      <Switch
        value={theme === darkTheme}
        onValueChange={toggleTheme}
      />
    </Container>
  );
};
const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default ThemeSwitch;