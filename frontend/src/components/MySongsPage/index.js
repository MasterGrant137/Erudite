import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mySongs } from '../../store/songs';
import './MySongsPage.css'

export const MySongsPage = () => {
    const dispatch = useDispatch();
    const iframeRegex= /(<iframe)|id="(.*?)"|src="(.*?)"|title="(.*?)"(><\/iframe>)/g

    useEffect(() => {
        dispatch(mySongs());
    }, [dispatch])

    const songs = useSelector(state => {
        return state.songs;
    })

    const [visibility, setVisibility] = useState('hidden-mySongs-info');
    const [size, setSize] = useState('big-mySongs-lyrics');
    const [disabled, setDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('Edit');
    const [buttonType, setButtonType] = useState('button')

    const onSubmit = (e) => {
        e.preventDefault();


    }

    const songAndLyricsDiv = Object.values(songs).map(song => (
        <div key={song.media.replace(iframeRegex, '$2')}>
            <div
                key={song.media.replace(iframeRegex, '$2')}
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
            >
                <form id='mySongs-input-form' onSubmit={onSubmit}>
                    <input id='mySongs-song-title' value={song.title} />
                    <input id='mySongs-song-artist' value={song.artist} />
                    <input id='mySongs-song-producer' value={song.producer} />
                    <input id='mySongs-song-media' value={song.media} />
                    <button
                        type={buttonType}
                        onClick={() => {
                            setDisabled(false)
                            setButtonText('Submit')
                            setButtonType('submit')
                        }}>
                        {buttonText}
                    </button>
                    <button>Cancel</button>
                    <textarea id='mySongs-lyrics-field' value={song.body} disabled={disabled}/>
                </form>
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
                <span>Visits: {`${song.visits}`}</span> <br />
                <span>Created: {`${song.createdAt}`}</span> <br />
                <span>Updated: {`${song.updatedAt}`}</span>
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
