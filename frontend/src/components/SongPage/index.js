import React from 'react'
import '../../song.css'
import { Heading } from '../Heading'
import { SongsList } from '../SongsList'

export const SongPage = () => {
    return (
        <div className='song-page-container'>
            <Heading />
            < SongsList />
        </div>
    )
}

export default SongPage;
