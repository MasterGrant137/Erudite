import './SongPage.css'
import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as queryActions2 from '../../store/queries-2';
import './SongPage.css'

export const SongPage = () => {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const iframeRegex= /(<iframe)|width="(.*?)"|height="(.*?)"|id="(.*?)"|src="(.*?)"|title="(.*?)"(.*?)(><\/iframe>)/g
    const songHrefRegex = /(\w{5}:\/\/\w{3}\.\w{7}\.\w{3}\/)(\w{5}\/)([\w|-]{1,})(.*)/
    const songParams = useParams();
    
    const songSelector = useSelector(state => state?.song);
    const song = Object.values(songSelector)[0];
    const iframeSrc = song?.media?.replace(iframeRegex,'$5');
    const songHref = iframeSrc?.replace(songHrefRegex, '$1watch?v=$3');
    
    const commentsSelector = useSelector(state => state?.comments);
    const comments = Object.values(commentsSelector).map(comment => ( <li key={comment.id}>{comment.body}</li> ));

    useEffect(() => {
        dispatch(queryActions2.songPage(songParams?.title));
    }, [dispatch, songParams])

    useEffect(() => {
        dispatch(queryActions2.commentSection(songParams?.title))
    }, [dispatch, songParams])

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = songParams?.title;
        dispatch(queryActions2.addComment({ title, body }));
        setBody('');
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
                        <a href={songHref} target='_blank' rel='noreferrer noopener'>
                            <img
                                className='song-page-video'
                                alt={song?.title}
                                title={song?.title}
                                src={song?.coverArt}
                                crossOrigin={process.env.NODE_ENV === 'production' ? 'anonymous' : false}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongPage;
