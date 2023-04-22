import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../icones/logo.png';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Container>
        <LogoImage source={Logo} alt="Logo" />
      </Container>
    );
  }
  return null;
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export default SplashScreen;

