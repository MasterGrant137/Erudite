import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mySongs } from '../../store/songs';
import './MySongsPage.css'

export const MySongsPage = () => {
    const dispatch = useDispatch();
    const iframeRegex= /(<iframe)|id="(.*?)"|src="(.*?)"|title="(.*?)"(><\/iframe>)/g

    useEffect(() => {
        dispatch(mySongs());
    }, [dispatch])

    const songs = useSelector(state => {
        return state.songs;
    })

    const [visibility, setVisibility] = useState('hidden-mySongs-lyrics');
    const [size, setSize] = useState('big-mySongs-video')


    const songAndLyricsDiv = Object.values(songs).map(song => (
        <div key={song.media.replace(iframeRegex, '$2')}>
            <div
                key={song.media.replace(iframeRegex, '$2')}
                id={size}
                className='mySongs-lyrics'
                title={song.title}
                allow='fullscreen'
                onMouseOver={() => {
                    setVisibility('visible-mySongs-info');
                    setSize('small-mySongs-lyrics');
                }}
                onMouseOut={() => {
                    setVisibility('hidden-mySongs-info');
                    setSize('big-mySongs-lyrics');
                }}
            >
                <h1>{song.title}</h1>
                <textarea id='mySongs-lyrics-field'>{song.body}</textarea>
             </div>
             <textarea
                id={visibility}
                key={song.id}
                value={song.body}
                onMouseOver={() => {
                    setVisibility('visible-mySongs-info');
                    setSize('small-mySongs-lyrics');
                }}
                onMouseOut={() => {
                    setVisibility('hidden-mySongs-info');
                    setSize('big-mySongs-lyrics')
                }}
                disabled
                />
        </div>
    ));

    return (
        <div id='mySongs-page-container'>
            <div id='mySongs-bg-color-wrapper'>
                <div id='mySongs-headers-container'>
                    <div id='mySongs-page-header'>Erudite</div>
                    <div id='mySongs-header'>My Songs</div>
                </div>
                <div id='mySongs-carousel'>
                    {songAndLyricsDiv}
                </div>
            </div>
        </div>
    );
}

export default MySongsPage;
