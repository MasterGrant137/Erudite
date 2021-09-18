import React from 'react'
import { Link } from 'react-router-dom'
import '../../song.css'

export const AddSong = () => {
    return (
        <div className='song-page-container'>
            <h1>Add Song</h1>
            <form>
                <textarea
                    placeholder='Add Lyrics Here'
                    id='lyrics-container'
                    aria-label='Add Song Here'
                />
                <button>Submit</button>
                <Link to='/' className='cancel-btn'><button>Cancel</button></Link>
            </form>
        </div>
    )
}

export default AddSong;
