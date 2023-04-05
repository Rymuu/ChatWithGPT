import React, { useContext } from 'react';
import Routes from './src/config/routes';
import {Provider} from 'react-redux';
import {store} from './src/config/store';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './src/config/theme';
import ThemeSwitch from './src/components/ThemeSwitch';
import { ThemeContext } from './src/context/ThemeContext';
const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <ThemeSwitch />
          <Routes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
