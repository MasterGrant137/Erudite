import React, { useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import '../../song.css'
import * as queryActions from '../../store/queries';

export const AddSong = () => {
    const dispatch = useDispatch();
    const songObject = useSelector((state) => state.song);
    const { id } = useParams();
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [producer, setProducer] = useState('');
    const [body, setBody] = useState('');
    const [coverArt, setCoverArt] = useState('');


    return (
        <div className='song-page-container'>
            <h1>Add Song</h1>
            <form id='add-song-form'>
                <textarea
                    placeholder='Lyrics'
                    aria-label='Lyrics'
                />
                <input
                    placeholder='Artist'
                    aria-label='Artist'
                />
                <input
                    placeholder='Producer'
                    aria-label='Producer'
                />
                <input
                    placeholder='Media (Optional)'
                    aria-label='Media (Optional)'
                />
                <input
                    placeholder='Cover Art (Optional)'
                    aria-label='Cover Art (Optional)'
                />
                <button>Submit</button>
                <Link to='/' className='cancel-btn'><button>Cancel</button></Link>
            </form>
        </div>
    )
}

export default AddSong;
