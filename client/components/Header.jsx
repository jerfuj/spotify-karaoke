import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function Header() {
    const code = new URLSearchParams(window.location.search).get('code');
    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=fe60e323d09f45e7bf069353680f5a1a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public";

  return (
    <>
        <div className="headerContainer">
            <div className="title">
                <h1>Log In. Using Spotify</h1>
            </div>
            <div className="playlistButton">
                <a href={AUTH_URL}>
                    <button className='button'>{code ? <Dashboard code={code} /> : <Login />}</button>
                </a>
            </div>
      </div>
    </>
  )
}

export default Header
