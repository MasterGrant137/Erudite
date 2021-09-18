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
        console.log(state.queries);
        return state.queries
    });


    return (
        <div>
            I'm alive
        </div>
    )

}


export default SongPage;
