import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeSongs } from '../../store/songs';
import { useHistory } from 'react-router-dom';
import '../../auth.css';
import './HomePage.css'

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const iframeRegex= /(<iframe)|id="(.*?)"|src="(.*?)"|title="(.*?)"(><\/iframe>)/g

    const [visibility, setVisibility] = useState('hidden-home-lyrics');
    const [size, setSize] = useState('big-home-video');


    useEffect(() => {
        dispatch(homeSongs());
    }, [dispatch])


    const songs = useSelector(state => {
        return state.songs;
    })

    const clickHandler = (e) => {
        e.preventDefault();
        console.log(e);

        history.push(`songs/${e.target.title}/lyrics`)
    }

    const songAndLyricsDiv = Object.values(songs).map(song => (
        <div key={song.media.replace(iframeRegex, '$2')}
 onClick={(e) => {
                    clickHandler(e);
                }}
        >
            <iframe
                key={song.media.replace(iframeRegex, '$2')}
                id={size}
                className='home-video'
                src={song.media.replace(iframeRegex,'$3')}
                title={song.title}
                allow='fullscreen'
                onMouseOver={() => {
                    setVisibility('visible-home-lyrics');
                    setSize('small-home-video');
                }}
                onMouseOut={() => {
                    setVisibility('hidden-home-lyrics');
                    setSize('big-home-video');
                }}
             />
             <textarea
                id={visibility}
                key={song.id}
                value={song.body}
                title={song.title}

                onMouseOver={(e) => {
                    setVisibility('visible-home-lyrics');
                    setSize('small-home-video');
                }}
                onMouseOut={() => {
                    setVisibility('hidden-home-lyrics');
                    setSize('big-home-video');
                }}
                disabled
                />
        </div>
    ));

    return (
        <div id='home-page-container'>
            <div id='background-color-wrapper'>
                <div id='home-headers-container'>
                    <div id='home-page-header'>Erudite</div>
                    <div id='song-visits-header'>Top Songs</div>
                </div>
                <div id='home-carousel'>
                    {songAndLyricsDiv}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
