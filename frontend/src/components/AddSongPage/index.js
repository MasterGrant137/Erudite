import React from 'react'
import { Link } from 'react-router-dom'
import '../../song.css'

export const AddSong = () => {
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
