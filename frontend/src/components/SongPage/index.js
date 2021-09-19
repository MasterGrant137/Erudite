import React from 'react'
import '../../song.css'
import { SongsList } from '../SongsList'

export const SongPage = () => {
    return (
        <div className='song-page-container'>
            < SongsList />
        </div>
    )
}

export default SongPage;
