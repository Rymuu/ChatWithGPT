import React, {useEffect} from 'react';
import {Text, ScrollView} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {getCharacters} from '../actions/bachelors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const Bachelors = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const characters = useSelector(state => state.bachelors.characters);
  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  useFocusEffect(() => {
    //AsyncStorage.removeItem('token');
    AsyncStorage.getItem('token')
      .then(token => {
        if (!token) {
          navigation.navigate('Home');
        }
        else{
          console.log("token: "+token);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <ScrollView>
      <Text>Characters</Text>
      {characters.map(character => (
        <Text key={character._id}>{character.name}</Text>
      ))}
    </ScrollView>
  );
};

export default Bachelors;
