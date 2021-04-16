import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios'
import PlaylistItem from './PlaylistItem'
import SongContext from '../../context/SongContext'

function Playlist() {
    const context = useContext(SongContext);
    const playlist = context.playlist;

    // const [playlist, setPlaylist] = useState([])
    // const [user, setUser] = useState('')
    let [currentSong, setCurrentSong] = useState([])
    let location = useLocation();
    currentSong = location.state

    useEffect(() => {
        getAll()
        const artist = location.state.artist;
        const title = location.state.title;
        const albumUrl = location.state.albumUrl;
        const userEmail = location.state.userEmail;

        axios.post('http://localhost:3000/postsong', {artist, title, albumUrl, userEmail})
            .then((res) => {
                console.log("res data frmo client:", res.data)
                // once posted run the get playlist method
            })
            .catch((err) => {
                console.log('error at playlist component', err)
            })
    }, [currentSong])

    let getAll = () => {
        const artist = location.state.artist;
        const title = location.state.title;
        const albumUrl = location.state.albumUrl;
        const userEmail = location.state.userEmail;

        axios.get('http://localhost:3000/getplaylist', {
            params: {
                artist,
                title,
                albumUrl,
                userEmail,
            }
        })
            .then((res) => {
                setPlaylist(p => p = res.data)
                // console.log('current song', currentSong)
                // once posted run the get playlist method
            })
            .catch((err) => {
                console.log('error at playlist component', err)
            })
        }

    // let changeSong = (newAlbumUrl, newArtist, newTitle, newUserEmail) => {
    //     setCurrentSong({albumUrl: newAlbumUrl, artist: newArtist, title: newTitle, userEmail: newUserEmail })
    // }

    let refreshList = () => {
        getAll()
    }

  return (
    <div className="playlistContainer">
        <div className="playlistHeader"><h1 className="playlistH1">My Playlist</h1></div>
        <div className="playlistBox">
        {playlist.map((song, index) => {
            return (
                <PlaylistItem 
                    refreshList={refreshList}
                    // changeSong={changeSong}
                    userEmail={location.state.userEmail}
                    song={song}
                    key={song.uri}
                    index={index}
                />
            )
        })}
        </div>
    </div>
  )
}

export default Playlist
