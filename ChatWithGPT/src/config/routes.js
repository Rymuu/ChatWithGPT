import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import styled from 'styled-components';
import Home from '../screens/home';
import Bachelors from '../screens/bachelors';
import Chat from '../screens/chat';
import Register from '../screens/register';
const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <GlobalSafeArea>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen name="Chat" component={Chat} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Bachelors" component={Bachelors} />
          <Tab.Screen name="Register" component={Register} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.primaryColor};
`;

export default Routes;
