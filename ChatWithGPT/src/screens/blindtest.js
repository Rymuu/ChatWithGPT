import React, {useState, useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';
import axios from 'axios';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from '../actions/user';

const BlindTest = props => {
  const BLINDTEST_SIZE = 4; // Nombre de propositions pour le blindtest
  const PLAYLIST_ID = props.route.params.playlistId; // ID de la playlist Spotify
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

  const fetchRandomSongs = songsWithPreviewUrl => {
    const answers = [];
    const usedIndexes = [];
    while (answers.length < 4) {
      const index = Math.floor(Math.random() * songsWithPreviewUrl.length);
      if (!usedIndexes.includes(index)) {
        usedIndexes.push(index);
        const song = songsWithPreviewUrl[index].track;
        answers.push(song);
      }
    }
    return answers;
  };

  const fetchSongs = async () => {
    if (token) {
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
        const answers = fetchRandomSongs(songsWithPreviewUrl);

        // On choisit aléatoirement une chanson parmi les 4 pour être la réponse correcte
        const randomIndex = Math.floor(Math.random() * answers.length);
        setCorrectAnswerIndex(randomIndex);
        setSongs(answers);
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    fetchSongs();
    setIsClicked(false);
    setIsCorrectAnswer(null);
    setSelectedSongIndex(null);
  }, [token, PLAYLIST_ID]);

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
        setSelectedSongIndex(null);
        fetchSongs();
      }, 2000);
    }
  }, [isClicked]);

  useEffect(() => {
    if (songs.length >= BLINDTEST_SIZE) {
      handlePlay(correctAnswerIndex); // Jouer la première chanson de la liste
    }
  }, [songs]);

  return (
    <Container>
      {songs.length < BLINDTEST_SIZE || playedSongIndex === null ? (
        <Loading>Loading...</Loading>
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
                }}
                isCorrectAnswer={index === correctAnswerIndex}
                isSelected={index === selectedSongIndex}
                isClicked={isClicked}>
                <SongName>{song.name}</SongName>
                <ArtistName>{song.artists[0].name}</ArtistName>
              </SongItem>
            ))}
          </GridContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.primaryColor};
`; 

const Loading = styled.Text`
`; 

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
export default BlindTest;
