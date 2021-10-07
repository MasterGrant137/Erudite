import './SongPage.css'
import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { songPage } from '../../store/songs';
import * as queryActions from '../../store/queries';
import './SongPage.css'

export const SongPage = () => {
    const dispatch = useDispatch();

    const [body, setBody] = useState('');

    const iframeRegex= /(<iframe)|width="(.*?)"|height="(.*?)"|id="(.*?)"|src="(.*?)"|title="(.*?)"(.*?)(><\/iframe>)/g
    const songParams = useParams();

   useEffect(() => {
        dispatch(songPage(songParams.title));
    }, [dispatch, songParams])


    useEffect(() => {
        dispatch(queryActions.addComment(songParams.title))
    }, [dispatch, songParams])


    const songSelector = useSelector(state => {
        return state.songs;
    })

    const handleSubmit = async(e) => {
        e.preventDefault();

        const title = songParams.title;

        await dispatch(queryActions.addComment({ title, body }))
    }

    const song = Object.values(songSelector)[0];

    return (
        <div id='song-page-container'>
            <div id='sp-background-color-wrapper'>
                <div id='song-page-headers-container'>
                    <span id='song-page-header'>Erudite</span>
                    <span id='song-page-title'>{song?.title}</span>
                </div>
                <div id='sp-inner-container'>
                    <div id='sp-comments-container'>
                        <form id='add-comment-form' onSubmit={handleSubmit}>
                            <textarea
                                placeholder='comment'
                                aria-label='comment'
                                id='add-comment'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                            />
                            <button type='submit'>Submit</button>
                        </form>
                        <div id='sp-comments-holder'>

                        </div>
                    </div>
                         <textarea
                             id='song-page-lyrics'
                             key={song?.id}
                             value={song?.body}
                             title={song?.title}
                             disabled
                         />
                    <div className='song-page-video'>
                        <iframe
                            className='song-page-video'
                            src={song?.media.replace(iframeRegex,'$5')}
                            title={song?.title}
                            allow='fullscreen'
                         />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongPage;
