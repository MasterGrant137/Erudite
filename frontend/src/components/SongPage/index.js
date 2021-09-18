import './SongPage.css'
import { getSongs } from '../../store/songs.js'
import { useDispatch, useSelector } from 'react-redux';
import '../../auth.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const SongPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    const songs = useSelector(state => {
        console.log(`THIS IS STATE.QUERIES: ${state}`);
        return state.queries
    });


    // const results = songs.map(song => (
    //     <div>
    //         {song.title}
    //     </div>
    // ))

    console.log(`${songs} is songs on SongPage index.js`);

    return (
        <div id='song-page-container'>
            I'm ALIVE
        </div>
    )

}


export default SongPage;
