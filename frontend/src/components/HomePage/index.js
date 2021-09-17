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
    const [color, setColor] = useState(null);

    useEffect(() => {
        dispatch(homeSongs());
    }, [dispatch])

    const songAndLyricsDiv = Object.values(songs).map(song => (
        <div key={song.media.replace(iframeRegex, '$2')}>
            <iframe
                key={song.media.replace(iframeRegex, '$2')}
                id='home-videos'
                src={song.media.replace(iframeRegex,'$3')}
                title={song.title}
                allow='fullscreen'
                onMouseOver={() => setVisibility('visible-home-lyrics')}
                onMouseOver={() => setColor(color ? null : 'blueClass')}
                onMouseOut={() => setColor(null)}
             />
             <textarea id='visible-home-lyrics' type='text' key={song.id} value={song.body} disabled></textarea>
        </div>
    ));


    return (
        <div id='home-page-container'>
            <div id='home-page-header' className={color}>Erudite</div>
            <div id='song-visits-header'>Top Songs</div>
            <div id='carousel-nav'><span>⬅️</span><span>➡️</span></div>
            <div id='home-songs-container'>
                {songAndLyricsDiv}
            </div>
        </div>
    );
}

export default HomePage;
