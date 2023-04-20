import React, {useEffect} from 'react';
import {Text, ScrollView} from 'react-native';
import BachelorCard from '../components/BachelorCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlaylists} from '../actions/playlists';
import {getToken} from '../actions/user';
import {useNavigation} from '@react-navigation/native';

const Playlists = () => {
  const navigation = useNavigation();
  const playlists = useSelector(state => state.playlists.playlists);
  const token = useSelector(state => state.user.accessToken);

  const dispatch = useDispatch();
  const handlePress = playlistId => {
    navigation.navigate('BlindTest', {playlistId});
  };
  const handleClick = () => {
    console.log(playlists);
  };
  useEffect(() => {
    dispatch(getToken());
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(fetchPlaylists(token));
      console.log('les playlists : ', playlists);
    }
  }, [token]);

  return (
    <ScrollView>
      <Text onPress={() => handleClick()}>playlists</Text>
      {playlists &&
        playlists.map(playlist => (
          <BachelorCard
            name={playlist.name}
            onPress={() => handlePress(playlist.id)}
            image={playlist.images[0].url}
          />
        ))}
    </ScrollView>
  );
};

export default Playlists;
