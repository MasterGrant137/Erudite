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

    const contextMenuHandler = async(mainE) => {
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
            menuItem.addEventListener('click', (subE) => {
                const cardInputs = Array.from(mainE.nativeEvent.srcElement.children);
                cardInputs.map((input) => {
                    if (input.dataset.msInput === subE.target.dataset.msItem) {
                        input.select();
                        navigator.clipboard.writeText(input.value);
                        alert('Successfully copied to clipboard!')
                        return void(0);
                    }
                    return void(0);
                })
            })
        })
    }

    body.addEventListener('click', (e) => {
        const contextMenu = document.getElementById('context-menu');
        if (e.target.offsetParent !== contextMenu) {
            contextMenu?.classList.add('invisible')
        }
    })

    const songs = useSelector(state => {
        return state.queriedSongs;
    })

    const [visibility, setVisibility] = useState('hidden-mySongs-info');
    const [size, setSize] = useState('big-mySongs-card');

    const songDiv = Object.values(songs).map((song, idx) => (
        <div key={+song?.id} id={+song?.id}>
            <div
                id={size}
                className='mySongs-card'
                onMouseOver={() => {
                    setVisibility('visible-mySongs-info');
                    setSize('small-mySongs-card');
                }}
                onMouseOut={() => {
                    setVisibility('hidden-mySongs-info');
                    setSize('big-mySongs-card');
                }}

                onContextMenu={contextMenuHandler}
            >
                    <input data-ms-input='title' value={song?.title} disabled/>
                    <input data-ms-input='artist' value={song?.artist} disabled/>
                    <input data-ms-input='producer' value={song?.producer} disabled/>
                    <input data-ms-input='media' value={song?.media} disabled/>
                    <input data-ms-input='cover-art' value={song?.coverArt} disabled/>

                    <NavLink to={`/edit/${song?.id}`}>Edit</NavLink>
                    <textarea data-ms-input='body' value={song?.body} disabled/>
             </div>
             <div
                id={visibility}
                 onMouseOver={() => {
                    setVisibility('visible-mySongs-info');
                    setSize('small-mySongs-card');
                }}
                onMouseOut={() => {
                    setVisibility('hidden-mySongs-info');
                    setSize('big-mySongs-card')
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
                    {songDiv}
                    <div id='context-menu' className='invisible'>
                        <div className='context-menu-item' data-ms-item='title'>Copy Title</div>
                        <div className='context-menu-item' data-ms-item='artist'>Copy Artist</div>
                        <div className='context-menu-item' data-ms-item='producer'>Copy Producer</div>
                        <div className='context-menu-item' data-ms-item='media'>Copy Media</div>
                        <div className='context-menu-item' data-ms-item='cover-art'>Copy Cover Art</div>
                        <div className='context-menu-item' data-ms-item='body'>Copy Body</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MySongsPage;
