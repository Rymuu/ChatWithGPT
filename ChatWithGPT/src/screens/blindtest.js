import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import axios from 'axios';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from '../actions/user';
import Timer from '../components/Timer';

const BLINDTEST_SIZE = 4; // Nombre de propositions pour le blindtest
const PLAYLIST_ID = '37i9dQZF1DXbS5WTN5nKF7'; // ID de la playlist Spotify

const BlindTest = () => {
  const [songs, setSongs] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [playedSongIndex, setPlayedSongIndex] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [isClicked, setIsClicked] = useState(null);

  const token = useSelector(state => state.user.accessToken);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, []);

  const handleAnswerSelection = index => {
    setSelectedAnswerIndex(index);
    setIsCorrectAnswer(index === correctAnswerIndex);
  };

  const handleItemClick = index => {
    if (index === correctAnswerIndex) {
      setIsCorrectAnswer(true);
    } else {
      setIsCorrectAnswer(false);
    }
  };
  const handlePlay = async songIndex => {
    console.log(songs[songIndex]);
    if (songs[songIndex]) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: songs[songIndex].id,
        url: songs[songIndex].preview_url,
      });
      await TrackPlayer.play();
      setPlayedSongIndex(songIndex);
    }
  };

  // Cette fonction asynchrone permet de récupérer les données d'une playlist Spotify

  const fetchSongs = async () => {
    if(token){
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=100`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const items = response.data.items;
        const songsWithPreviewUrl = items.filter(
          song => song.track.preview_url !== null,
        );
  
        // On crée un tableau qui contient 4 chansons aléatoires
  
        const answers = [];
        for (let i = 0; i < 4; i++) {
          const index = Math.floor(Math.random() * songsWithPreviewUrl.length);
          const song = songsWithPreviewUrl[index].track;
          answers.push(song);
        }
  
        // On choisit aléatoirement une chanson parmi les 4 pour être la réponse correcte
  
        const randomIndex = Math.floor(Math.random() * 4);
        setCorrectAnswerIndex(randomIndex);
        const randomSong = answers[randomIndex];
        setSongs(answers);
  
        console.log('les propositions : ', answers);
        console.log('la bonne réponse : ', correctAnswerIndex);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [token]);

  useEffect(() => {
    console.log('taille de songs : ', songs.length);
    if (songs.length >= BLINDTEST_SIZE) {
      console.log('je suis en blindtest');
      handlePlay(correctAnswerIndex); // Jouer la première chanson de la liste
    }
  }, [songs]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {
      songs.length < BLINDTEST_SIZE ||
      playedSongIndex === null ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <GridContainer>
            {songs.map((song, index) => (
              <SongItem
                key={song.id}
                onPress={() => {
                  setSelectedAnswerIndex(index);
                  setSelectedSongIndex(index);
                  setIsCorrectAnswer(index === correctAnswerIndex);
                  setIsClicked(true);
                  console.log('clicked', isClicked);
                }}
                isCorrectAnswer={index === correctAnswerIndex}
                isSelected={index === selectedSongIndex}
                isClicked={isClicked}>
                <SongName>{song.name}</SongName>
                <ArtistName>{song.artists[0].name}</ArtistName>
              </SongItem>
            ))}
          </GridContainer>
          {correctAnswerIndex !== null && (
            <CorrectAnswer isCorrectAnswer={isCorrectAnswer}>
              {songs[correctAnswerIndex].name} -{' '}
              {songs[correctAnswerIndex].artists[0].name}
            </CorrectAnswer>
          )}
        </>
      )}
    </View>
  );
};

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 300px;
  margin-bottom: 20px;
`;

const SongItem = styled.TouchableOpacity`
  width: 140px;
  height: 140px;
  margin-bottom: 20px;
  padding: 10px;
  border-width: 1px;
  background-color: ${({isCorrectAnswer, isSelected}) =>
    isSelected ? (isCorrectAnswer ? '#4CAF50' : '#E91E63') : '#FFF'};
  border-color: ${({isCorrectAnswer, isClicked}) =>
    isClicked ? (isCorrectAnswer ? '#4CAF50' : '#E91E63') : 'transparent'};
`;

const SongName = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const ArtistName = styled.Text`
  font-size: 16px;
`;

const CorrectAnswer = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
  color: ${({isCorrectAnswer}) => (isCorrectAnswer ? '#4CAF50' : '#E91E63')};
`;

export default BlindTest;