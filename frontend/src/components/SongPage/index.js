import './SongPage.css'
import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as queryActions1 from '../../store/queries-1';
import * as queryActions2 from '../../store/queries-2';
import './SongPage.css'

export const SongPage = () => {
    const dispatch = useDispatch();

    const [body, setBody] = useState('');

    const iframeRegex= /(<iframe)|width="(.*?)"|height="(.*?)"|id="(.*?)"|src="(.*?)"|title="(.*?)"(.*?)(><\/iframe>)/g
    const songParams = useParams();

    useEffect(() => {
        dispatch(queryActions2.songPage(songParams?.title));
    }, [dispatch, songParams])

    useEffect(() => {
        dispatch(queryActions1.addComment(songParams?.title));
    }, [dispatch, songParams])

    useEffect(() => {
        dispatch(queryActions2.commentSection(songParams?.title));
    }, [dispatch, songParams])

    const songSelector = useSelector(state => state.song);

    //* we should be able to refactor this now
    let song = Object.values(songSelector)[0];
    // const songStateVals = Object.values(songSelector);
    // if (songStateVals.length === 1) song = songStateVals[0];
    // else song = songStateVals.find(song => song.title === songParams.title);

    const commentsSelector = useSelector(state => state.comments);

    const comments = Object.values(commentsSelector).map(comment => (
        <li>{comment.body}</li>
    ))

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = songParams?.title;
        dispatch(queryActions1.addComment({ title, body }));
        document.getElementById('add-comment').value='';
    }


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
                        <ul id='sp-comments-holder'>{comments}</ul>
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
                            src={song?.media?.replace(iframeRegex,'$5')}
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
