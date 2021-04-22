import React, { useState, useEffect, useRef, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import AppContext from '../../context/AppContext';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const Button = styled.button`
  width: 50%;
  height: 2.5rem;
  background-color: #fff;
  border: 1px solid black;
  transition: 500ms ease-out;
  &:hover {
    cursor: pointer;
    background-color: #e0dfdf;
  }
`;

function AudioPlayer() {
  const context = useContext(AppContext);
  const [play, setPlay] = useState(false);
  const accessToken = context.accessToken;

  useEffect(() => {
    if (!context.currentSong) return setPlay(false);
    setPlay(true);
  }, [context.currentSong]);

  if (!accessToken) return null;

  const playerCallback = (state) => {
    if (!state.isPlaying) {
      setPlay(false);
      if (state.type === 'player_update' && state.position === 0) {
        context.nextSong();
      }
    }
  };

  return (
    <Container>
      <Button onClick={context.prevSong}>Previous</Button>
      <Button onClick={context.nextSong}>Next</Button>
      <SpotifyPlayer
        play={play}
        token={accessToken}
        showSaveIcon
        uris={context.currentSong ? [context.currentSong.uri] : []}
        callback={playerCallback}
        styles={{
          sliderColor: '#2941ab',
          activeColor: '#2941ab',
        }}
      />
    </Container>
  );
}

export default AudioPlayer;