import React, {useEffect, useState} from 'react';
import Routes from './src/config/routes';
import {Provider} from 'react-redux';
import {store} from './src/config/store';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './src/config/theme';
import { ThemeContext } from './src/context/ThemeContext';
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
import TrackPlayer from 'react-native-track-player';
import SplashScreen from './src/screens/splashScreen';
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
    return <SplashScreen/>;
  }
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
