import './SongPage.css'
import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { songPage } from '../../store/songs';
import * as queryActions from '../../store/queries';
import * as songsActions from '../../store/songs';
import './SongPage.css'

export const SongPage = () => {
    const dispatch = useDispatch();

    const [body, setBody] = useState('');
    const [commentSection, setCommentSection] = useState('');

    const iframeRegex= /(<iframe)|width="(.*?)"|height="(.*?)"|id="(.*?)"|src="(.*?)"|title="(.*?)"(.*?)(><\/iframe>)/g
    const songParams = useParams();

    useEffect(() => {
        dispatch(songPage(songParams.title));
    }, [dispatch, songParams])

    useEffect(() => {
        dispatch(queryActions.addComment(songParams.title));
    }, [dispatch, songParams])

    useEffect(() => {
        const comments = dispatch(songsActions.getCommentSection(songParams.title));
        setCommentSection(Object.values(comments));
    }, [dispatch, songParams])

    const songSelector = useSelector(state => {
        return state.songs;
    })

    const commentsSelector = useSelector(state => {
        return state.songs;
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        const title = songParams.title;
        await dispatch(queryActions.addComment({ title, body }));
        document.getElementById('add-comment').value='';
    }

    let song;
    const songStateVals = Object.values(songSelector);
    if (songStateVals.length === 1) song = songStateVals[0];
    else song = songStateVals.find(song => song.title === songParams.title);

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
                        <div id='sp-comments-holder'>{console.log(commentSection)}{commentSection}</div>
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
