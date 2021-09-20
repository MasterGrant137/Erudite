import './SongPage.css'
import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { songPage } from '../../store/songs';
import './SongPage.css'

export const SongPage = () => {
    const dispatch = useDispatch();
    const iframeRegex= /(<iframe)|id="(.*?)"|src="(.*?)"|title="(.*?)"(><\/iframe>)/g
    const songParams = useParams(); //* for redirection to edit page verification

   useEffect(() => {
        dispatch(songPage(songParams.title));
    }, [dispatch])

    const songSelector = useSelector(state => {
        return state.songs;
    })

    const song = Object.values(songSelector)[0];

    const [size, setSize] = useState('big-song-page-lyrics');

    return (
        <div id='song-page-container'>
            <div id='sp-background-color-wrapper'>
                <div id='song-page-headers-container'>
                    <span id='song-page-header'>Erudite</span>
                    <span id='song-page-title'>{song?.title}</span>
                </div>
                <div id='sp-inner-container'>
                    <div id='song-page-lyrics'>
                         <textarea
                             id='song-page-lyrics'
                             key={song?.id}
                             value={song?.body}
                             title={song?.title}
                             disabled
                         />
                    </div>
                    <div className='song-page-video' id={size}>
                        <iframe
                            id={size}
                            className='home-video'
                            src={song?.media.replace(iframeRegex,'$3')}
                            title={song?.title}
                            allow='fullscreen'
                            onMouseOver={() => {
                                setSize('small-home-video');
                            }}
                            onMouseOut={() => {
                                setSize('big-home-video');
                            }}
                         />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongPage;
