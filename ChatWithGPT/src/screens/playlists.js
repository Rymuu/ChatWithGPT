import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import ListCard from '../components/ListCard';
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
  useEffect(() => {
    dispatch(getToken());
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(fetchPlaylists(token));
    }
  }, [token]);

  return (
    <ScrollView>
      {playlists &&
        playlists.map(playlist => (
          <ListCard
            key={playlist.id}
            name={playlist.name}
            onPress={() => handlePress(playlist.id)}
            image={playlist.images[0].url}
          />
        ))}
    </ScrollView>
  );
};

export default Playlists;
