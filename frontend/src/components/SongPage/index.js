import './SongPage.css'
import { queriedSongs } from '../../store/song-queries';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../auth.css';
import { useEffect, useState } from 'react';

const SongPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(queriedSongs())
    }, [dispatch])

    const songs = useSelector(state => {
        return state.queries
    });

    // const queryResultsDiv = Object.values(songs)

    return (
        <div>
            {songs}
        </div>
    )

}


export default SongPage;
