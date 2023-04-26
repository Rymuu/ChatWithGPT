import React, { useContext , useState} from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from '../context/ThemeContext';
import { Switch } from 'react-native';
import { darkTheme } from '../config/theme';
import i18n from '../config/i18n';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
const Setting = () => {
  const {t} = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleLanguageSwitch = (language) => {
    setLoading(true);
    setTimeout(() => {
      changeLanguage(language);
      setLoading(false);
    }, 10);
  };

  const handlePress = () => {
    AsyncStorage.removeItem('token');
    navigation.navigate('Home');
  };
  return (
    <Container>
        <Title>{t('setting')}</Title>
        <ContainerSetting>
          <Switch
            value={theme === darkTheme}
            onValueChange={toggleTheme}
          />
          <LanguageContainer>
            <LanguageSwitchButton
              onPress={() => handleLanguageSwitch('en')}
              active={i18n.language === 'en'}
            >
              <LanguageSwitchButtonText>EN</LanguageSwitchButtonText>
            </LanguageSwitchButton>
            <LanguageSwitchButton
              onPress={() => handleLanguageSwitch('fr')}
              active={i18n.language === 'fr'}
            >
              <LanguageSwitchButtonText>FR</LanguageSwitchButtonText>
            </LanguageSwitchButton>
          </LanguageContainer>
        </ContainerSetting>
        <Button onPress={handlePress}>
          <ButtonText>{t('logout')}</ButtonText>
        </Button>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${props => props.theme.primaryColor};
`;
const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.secondaryColor};
`;
const ContainerSetting = styled.View`
  flex-direction: column;
`;

const LanguageContainer = styled.View`
  flex-direction: row;
`;
const LanguageSwitchButton = styled.TouchableOpacity`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: ${props => (props.active ? props.theme.secondaryColor : 'transparent')};
`;

const LanguageSwitchButtonText = styled.Text`
  color: ${props => (props.active ? props.theme.secondaryColor : 'white')};
  font-size: 16px;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.secondaryColor};
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 16px;
  font-weight: bold;
`;
export default Setting;