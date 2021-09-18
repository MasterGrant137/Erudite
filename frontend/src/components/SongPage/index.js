import './SongPage.css'
import { queriedSongs } from '../../store/song-queries';
import { useDispatch, useSelector } from 'react-redux';
import '../../auth.css';
import { useEffect, useState } from 'react';


const SongPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(queriedSongs())
    }, [dispatch])

    const songs = useSelector(state => {
        console.log(state);
        return state.queries
    });

    console.log(`${songs} ARE HERE`);

    return (
        <div>
            Alive
        </div>
    )

}


export default SongPage;
