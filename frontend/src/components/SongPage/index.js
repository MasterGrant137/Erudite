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
