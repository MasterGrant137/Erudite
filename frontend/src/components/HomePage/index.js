import './HomePage.css'
import { homeSongs } from '../../store/songs';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../auth.css';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const dispatch = useDispatch();
    const iframeRegex= /(<iframe)|id="(.*?)"|src="(.*?)"|title="(.*?)"(><\/iframe>)/g

    const songs = useSelector(state => {
        return state.songs;
    })

    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        dispatch(homeSongs());
    }, [dispatch])

    useEffect(() => {
        setHidden(true);
    }, [])

    const songAndLyricsDiv = Object.values(songs).map(song => (
        <div key={song.media.replace(iframeRegex, '$2')}>
            <iframe
                key={song.media.replace(iframeRegex, '$2')}
                id='home-videos'
                src={song.media.replace(iframeRegex,'$3')}
                title={song.title}
                allow='fullscreen'
             />
             <textarea id='home-lyrics' type='text' key={song.id} onHover={() => setHidden(false)} hidden={hidden} value={song.body} disabled />
        </div>
    ));


    return (
        <div id='home-page-container'>
            <div id='home-page-header'>Erudite</div>
            <div id='song-visits-carousel'>Top Songs</div>
            <div id='home-songs-container'>{songAndLyricsDiv}</div>
        </div>
    );
}

export default HomePage;
