import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import styled from 'styled-components';
import Home from '../screens/home';
import Chat from '../screens/chat';
import Register from '../screens/register';
import HomeIcon from '../icones/home.png';
import PlaylistIcon from '../icones/playlist.png';
import ChatIcon from '../icones/chat.png';
import SpotifyLogin from '../screens/spotifyLogin';
import BlindTest from '../screens/blindtest';
import Playlists from '../screens/playlists';
import CreateAccountIcon from '../icones/create-account.png';
import Setting from '../screens/setting';
const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <GlobalSafeArea>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                  source={focused ? ChatIcon : ChatIcon}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Playlists"
            component={Playlists}
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                  source={focused ? PlaylistIcon : PlaylistIcon}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                  source={focused ? HomeIcon : HomeIcon}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Register"
            component={Register}
            options={{
              tabBarIcon: ({focused}) => (
                <Image
                  source={focused ? CreateAccountIcon : CreateAccountIcon}
                />
              ),
            }}
          />
          <Tab.Screen name="SpotifyLogin" component={SpotifyLogin} />
          <Tab.Screen name="BlindTest" component={BlindTest} />
          <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.primaryColor};
`;
const Image = styled.Image`
  width: 25px;
  height: 25px;
`;

export default Routes;
