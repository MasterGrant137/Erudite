import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import '../../song.css'
import './AddSongPage.css'
import * as queryActions from '../../store/queries';

export const AddSong = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [producer, setProducer] = useState('');
    const [body, setBody] = useState('');
    const [media, setMedia] = useState('');
    const [coverArt, setCoverArt] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();

        await dispatch(queryActions.newSong({artist, title, producer, body, media, coverArt}));
        history.push('/my-songs');
    }

    return (
        <div className='song-page-container'>
            <h1 id='add-song-header'>Add Song</h1>
            <form id='add-song-form' onSubmit={handleSubmit}>
                <textarea
                    placeholder='Lyrics'
                    aria-label='Lyrics'
                    id='add-song-lyrics'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    resize='none'
                    required
                />
                <input
                    placeholder='Artist'
                    aria-label='Artist'
                    id='add-song-artist'
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                />
                <input
                    placeholder='Title'
                    aria-label='Title'
                    id='add-song-title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    placeholder='Producer'
                    aria-label='Producer'
                    id='add-song-producer'
                    value={producer}
                    onChange={(e) => setProducer(e.target.value)}
                />
                <input
                    placeholder='Media (Optional)'
                    aria-label='Media (Optional)'
                    id='add-song-media'
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                />
                <input
                    placeholder='Cover Art (Optional)'
                    aria-label='Cover Art (Optional)'
                    id='add-song-art'
                    value={coverArt}
                    onChange={(e) => setCoverArt(e.target.value)}
                />
                <button id='song-page-submit'>Submit</button>
                <button id='song-page-cancel-btn'><Link to='/my-songs' id='song-page-cancel-link'>Cancel</Link></button>
            </form>
        </div>
    )
}

export default AddSong;
