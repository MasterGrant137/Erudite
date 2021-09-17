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

    const [visibility, setVisibility] = useState('hidden-home-lyrics');

    useEffect(() => {
        dispatch(homeSongs());
    }, [dispatch])

    const songAndLyricsDiv = Object.values(songs).map(song => (
        <div key={song.media.replace(iframeRegex, '$2')}>
            <iframe
                key={song.media.replace(iframeRegex, '$2')}
                id='home-video'
                src={song.media.replace(iframeRegex,'$3')}
                title={song.title}
                allow='fullscreen'
                onMouseOver={() => setVisibility('visible-home-lyrics')}
                onMouseOut={() => setVisibility('hidden-home-lyrics')}
             />
             <textarea
                id={visibility}
                type='text'
                key={song.id}
                value={song.body}
                onMouseOver={() => setVisibility('visible-home-lyrics')}
                onMouseOut={() => setVisibility('hidden-home-lyrics')}
                disabled />
        </div>
    ));


    return (
        <div id='home-page-container'>
            <div id='home-headers-container'>
                <div id='home-page-header'>Erudite</div>
                <div id='song-visits-header'>Top Songs</div>
            </div>
            <div id='home-carousel'>
                {songAndLyricsDiv}
            </div>
        </div>
    );
}

export default HomePage;
