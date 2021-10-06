import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { mySongs } from '../../store/queries';
import './MySongsPage.css'

export const MySongsPage = () => {
    const dispatch = useDispatch();
    const body = document.querySelector('body');

    useEffect(() => {
        dispatch(mySongs());
    }, [dispatch])

    const contextMenuHandler = async(e) => {
        e.preventDefault();

        let posX = e.pageX;
        let posY = e.pageY;

        const contextMenu = document.getElementById('context-menu');
        contextMenu.classList.remove('invisible');
        contextMenu.classList.add('visible');
        contextMenu.style.position = 'absolute';
        contextMenu.style.display = 'visible';
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.left = `${posX}px`;
        // console.log(e.nativeEvent.srcElement);
    }

    body.addEventListener('click', (e) => {
        const contextMenu = document.getElementById('context-menu');
        if (e.target.offsetParent != contextMenu) {
            contextMenu.classList.remove('visible');
            contextMenu.classList.add('invisible')
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
                    <div id='context-menu'>
                        <div className='context-menu-item'>Title</div>
                        <div className='context-menu-item'>Artist</div>
                        <div className='context-menu-item'>Producer</div>
                        <div className='context-menu-item'>Media</div>
                        <div className='context-menu-item'>Cover Art</div>
                        <div className='context-menu-item'>Body</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MySongsPage;
