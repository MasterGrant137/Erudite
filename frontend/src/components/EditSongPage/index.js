import React from 'react'
import '../../song.css'
import { Link } from 'react-router-dom'

export const EditSong = () => {
    return (
        <div className='song-page-container'>
            <h1>Edit Song</h1>
            <form>
                <textarea
                    placeholder='Edit'
                    id='lyrics-container'
                    aria-label='Edit Song'
                />
                <button>Edit</button>
                <Link to='/' className='cancel-btn'><button>Cancel</button></Link>
            </form>
        </div>
    )
}

export default EditSong;
