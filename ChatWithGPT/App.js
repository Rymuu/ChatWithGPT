import React, {useContext, useEffect, useState} from 'react';
import Routes from './src/config/routes';
import {Provider} from 'react-redux';
import {store} from './src/config/store';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './src/config/theme';
import ThemeSwitch from './src/components/ThemeSwitch';
import { ThemeContext } from './src/context/ThemeContext';
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
import TrackPlayer from 'react-native-track-player';
const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setup = async () => {
      await TrackPlayer.setupPlayer({});
      setIsLoading(false);
    };
    setup();
  }, []);

  if (isLoading) {
    return null;
  }
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <ThemeSwitch />
          <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
