import './SongPage.css'
import { queriedSongs } from '../../store/song-queries';
import * as sessionActions from '../../store/session';
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
        console.log(`${state} = state on line 16 of SongPage > index.js`);
        return state.queries
    });

    return (
        <div>
            {songs}
        </div>
    )

}


export default SongPage;
