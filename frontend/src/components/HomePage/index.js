import './HomePage.css'
import { homeSongs } from '../../store/songs';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../auth.css';
import { useEffect } from 'react';

const HomePage = () => {
    const iframeRegex= /(<iframe)|id="(.*?)"|src="(.*?)"|title="(.*?)"(><\/iframe>)/g

    const dispatch = useDispatch();

    const songs = useSelector(state => {
        return state.songs;
    })

    useEffect(() => {
        dispatch(homeSongs())
    }, [dispatch])



    const songAndLyricsDiv = Object.values(songs).map(song => (
        <div>
            <iframe
                key={song.id}
                id={song.media.replace(iframeRegex, '$2')}
                src={song.media.replace(iframeRegex,'$3')}
                title={song.title}
                allow='fullscreen'
             />
             <p key={song.id}>{song.body}</p>
        </div>
    ));


    return (
        <div id='home-page-container'>
            <div id='home-page-header'>Erudite</div>
            <div id='home-songs-container'>{songAndLyricsDiv}</div>
        </div>
    );
}

export default HomePage;
