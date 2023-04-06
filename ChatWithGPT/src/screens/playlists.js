import React, {useEffect} from 'react';
import {Text, ScrollView} from 'react-native';
import BachelorCard from '../components/BachelorCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlaylists} from '../actions/playlists';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const Playlists = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.bachelors.characters);
  useEffect(() => {
    dispatch(fetchPlaylists);
  }, []);
//   const handlePress = bachelorName => {
//     navigation.navigate('Chat', {bachelorName});
//   };

//   useFocusEffect(() => {
//     //AsyncStorage.removeItem('token');
//     AsyncStorage.getItem('token')
//       .then(token => {
//         if (!token) {
//           navigation.navigate('Home');
//         }
//         else{
//           console.log("token: "+token);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
  return (
    <ScrollView>
      <Text>playlists</Text>
      {/* {playlists.map(character => (
        <BachelorCard
          name={character.name}
          onPress={() => handlePress(character.name)}
        />
      ))} */}
    </ScrollView>
  );
};

export default Playlists;
