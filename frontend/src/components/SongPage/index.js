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

    console.log(songParams.title);

   useEffect(() => {
        dispatch(songPage(songParams.title));
    }, [dispatch])

//     const songSelector = useSelector(state => {
//         return state.song;
//     })

//     console.log(songSelector);

//     const song = Object.values(songSelector)[0];

    const [visibility, setVisibility] = useState('hidden-mySongs-info');
    const [size, setSize] = useState('big-mySongs-lyrics');

    return (
        <div>This is HIT</div>
        // <div id='mySongs-page-container'>
        //     <div id='mySongs-bg-color-wrapper'>
        //         <div id='mySongs-headers-container'>
        //             <div id='mySongs-page-header'>Erudite</div>
        //             <div id='mySongs-header'>Edit Song</div>
        //         </div>
        //         <div id='mySongs-carousel'>
        //             <div key={song?.media.replace(iframeRegex, '$2')}>
        //                 <div
        //                     key={song?.media.replace(iframeRegex, '$2')}
        //                     id={size}
        //                     className='mySongs-lyrics'
        //                     onMouseOver={() => {
        //                         setVisibility('visible-mySongs-info');
        //                         setSize('small-mySongs-lyrics');
        //                     }}
        //                     onMouseOut={() => {
        //                         setVisibility('hidden-mySongs-info');
        //                         setSize('big-mySongs-lyrics');
        //                     }}
        //                 >
        //                     <input id='mySongs-song-title'  value={song?.title} />
        //                     <input id='mySongs-song-artist' value={song?.artist} />
        //                     <input id='mySongs-song-producer' value={song?.producer} />
        //                     <input id='mySongs-song-media' value={song?.media} />
        //                     <input id='mySongs-song-coverArt' value={song?.coverArt} />
        //                     <textarea id='mySongs-lyrics-field' value={song?.body} />
        //             </div>
        //                 <div
        //                    id={visibility}
        //                     onMouseOver={() => {
        //                        setVisibility('visible-mySongs-info');
        //                        setSize('small-mySongs-lyrics');
        //                    }}
        //                    onMouseOut={() => {
        //                        setVisibility('hidden-mySongs-info');
        //                        setSize('big-mySongs-lyrics')
        //                    }}
        //                 >
        //                    <span>Visits: {`${song?.visits}`}</span> <br />
        //                    <span>Created: {`${song?.createdAt}`}</span> <br />
        //                    <span>Updated: {`${song?.updatedAt}`}</span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default SongPage;
