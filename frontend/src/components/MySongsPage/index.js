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

    const contextMenuHandler = async(mainE, subE) => {
        mainE.preventDefault();
        let posX = mainE.pageX;
        let posY = mainE.pageY;

        const contextMenu = document.getElementById('context-menu');
        contextMenu.classList.remove('invisible');
        contextMenu.style.position = 'absolute';
        contextMenu.style.display = 'visible';
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.left = `${posX}px`;


        const contextMenuItems = Array.from(contextMenu.children);
        contextMenuItems.forEach(menuItem => {
            menuItem.addEventListener('click', (e) => {
                const cardInputs = Array.from(mainE.nativeEvent.srcElement.children);
                cardInputs.map(input => {
                    if (input.dataset.msItem === 'title') {
                        input.select();
                        document.execCommand('copy');
                        console.log('copied to clipboard');
                    }
                    // input.dataset.msItem === 'title'
                })
                // console.log(targInput);
            })
        })

        // console.log(mainE.nativeEvent.srcElement);
        // console.log(subE);
    }

    body.addEventListener('click', (e) => {
        const contextMenu = document.getElementById('context-menu');
        if (e.target.offsetParent != contextMenu) {
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
                    <input data-ms-item='title' value={song?.title} disabled/>
                    <input data-ms-item='artist' value={song?.artist} disabled/>
                    <input data-ms-item='producer' value={song?.producer} disabled/>
                    <input data-ms-item='media' value={song?.media} disabled/>
                    <input data-ms-item='cover-art' value={song?.coverArt} disabled/>

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
                    <div id='context-menu' className='invisible'>
                        <div className='context-menu-item' id='c-m-title' onClick={contextMenuHandler}>Copy Title</div>
                        <div className='context-menu-item' id='c-m-artist' onClick={contextMenuHandler}>Copy Artist</div>
                        <div className='context-menu-item' id='c-m-producer' onClick={contextMenuHandler}>Copy Producer</div>
                        <div className='context-menu-item' id='c-m-media' onClick={contextMenuHandler}>Copy Media</div>
                        <div className='context-menu-item' id='c-m-cover-art' onClick={contextMenuHandler}>Copy Cover Art</div>
                        <div className='context-menu-item' id='c-m-body' onClick={contextMenuHandler}>Copy Body</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MySongsPage;
