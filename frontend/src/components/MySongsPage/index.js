import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { mySongs } from '../../store/queries';
import './MySongsPage.css'

export const MySongsPage = () => {
    const dispatch = useDispatch();
    const root = document.getElementById('root');
    const contextMenuExists = document.getElementById('context-menu');

    useEffect(() => {
        dispatch(mySongs());
    }, [dispatch])

    const contextMenuHandler = async(e) => {
        e.preventDefault();

        const posX = e.pageX;
        const posY = e.pageY;


        if (contextMenuExists) root.removeChild(contextMenuExists);

        const contextMenu = document.createElement('div');
        contextMenu.id = 'context-menu';
        contextMenu.style.position = 'absolute';
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.left = `${posX}px`;
        root.appendChild(contextMenu);

        const options = ['Title', 'Artist', 'Producer', 'Media', 'CoverArt', 'Body']

        for (let i = 0; i < 6; i++) {
            let contextMenuItem = document.createElement('div');
            contextMenuItem.className = 'context-menu-item';
            contextMenuItem.innerText = `Copy ${options[i]}`
            contextMenu.appendChild(contextMenuItem);
        }

        // console.log(e.nativeEvent.srcElement);
    }

    root.addEventListener('click', (e) => {
        const root = document.getElementById('root');
        const contextMenuExists = document.getElementById('context-menu');
        // console.log(root.children[2]);
        if (root.children[2]) {
            // console.log('hit');
            root.removeChild(contextMenuExists);
        }
    })

    const songs = useSelector(state => {
        return state.queriedSongs;
    })

    const [visibility, setVisibility] = useState('hidden-mySongs-info');
    const [size, setSize] = useState('big-mySongs-lyrics');

    const songAndLyricsDiv = Object.values(songs).map(song => (
        <div key={+song?.id}>
            <div
                id={size}
                className='mySongs-lyrics'
                onMouseOver={() => {
                    setVisibility('visible-mySongs-info');
                    setSize('small-mySongs-lyrics');
                }}
                onMouseOut={() => {
                    setVisibility('hidden-mySongs-info');
                    setSize('big-mySongs-lyrics');
                }}
                onContextMenu={contextMenuHandler}
            >
                    <input id='mySongs-song-title' value={song?.title} disabled/>
                    <input id='mySongs-song-artist' value={song?.artist} disabled/>
                    <input id='mySongs-song-producer' value={song?.producer} disabled/>
                    <input id='mySongs-song-media' value={song?.media} disabled/>
                    <input id='mySongs-song-coverArt' value={song?.coverArt} disabled/>

                    <NavLink to={`/edit/${song?.id}`}>Edit</NavLink>
                    <textarea id='mySongs-lyrics-field' value={song?.body} disabled/>
             </div>
             <div
                id={visibility}
                 onMouseOver={() => {
                    setVisibility('visible-mySongs-info');
                    setSize('small-mySongs-lyrics');
                }}
                onMouseOut={() => {
                    setVisibility('hidden-mySongs-info');
                    setSize('big-mySongs-lyrics')
                }}
             >
                <span>Visits: {`${song?.visits}`}</span> <br />
                <span>Created: {`${song?.createdAt}`}</span> <br />
                <span>Updated: {`${song?.updatedAt}`}</span>
                </div>
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
