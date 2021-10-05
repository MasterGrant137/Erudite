import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editSong, deleteSong } from '../../store/queries';
import { mySongs } from '../../store/queries';
import './EditSongPage.css'

export const EditSongPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const iframeRegex= /(<iframe)|id="(.*?)"|src="(.*?)"|title="(.*?)"(><\/iframe>)/g
    const songParams = useParams();

    const songs = useSelector(state => {
        return state.queriedSongs;
    })

    const songArray = Object.values(songs).filter(song => song?.id === +songParams?.id);
    const song = songArray[0];

    const [artist, setArtist] = useState(song?.artist);
    const [title, setTitle] = useState(song?.title);
    const [producer, setProducer] = useState(song?.producer);
    const [body, setBody] = useState(song?.body);
    const [media, setMedia] = useState(song?.media);
    const [coverArt, setCoverArt] = useState(song?.coverArt);
    const [visibility, setVisibility] = useState('hidden-mySongs-info');
    const [size, setSize] = useState('big-mySongs-lyrics');

    const handleSubmit = async(e) => {
        e.preventDefault();

        await dispatch(editSong({
            songID: songParams.id,
            artist,
            title,
            producer,
            body,
            media,
            coverArt,
        }));
        await dispatch(mySongs());
        history.push('/my-songs');
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        const songID = songParams.id;

        await dispatch(deleteSong(songID));
        history.push('/my-songs');
    }

    return (
        <div id='mySongs-page-container'>
            <div id='mySongs-bg-color-wrapper'>
                <div id='mySongs-headers-container'>
                    <div id='mySongs-page-header'>Erudite</div>
                    <div id='mySongs-header'>Edit Song</div>
                </div>
                <div id='mySongs-carousel'>
                    <div key={song?.media.replace(iframeRegex, '$2')}>
                        <div
                            key={song?.media.replace(iframeRegex, '$2')}
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
                        <form onSubmit={handleSubmit}>
                            <input id='mySongs-song-title' onChange={(e) => setTitle(e.target.value)} value={title} />
                            <input id='mySongs-song-artist' onChange={(e) => setArtist(e.target.value)} value={artist} />
                            <input id='mySongs-song-producer' onChange={(e) => setProducer(e.target.value)} value={producer} />
                            <input id='mySongs-song-media' onChange={(e) => setMedia(e.target.value)} value={media} />
                            <input id='mySongs-song-coverArt' onChange={(e) => setCoverArt(e.target.value)} value={coverArt} />
                            <button type='submit'>Submit</button>
                            <textarea id='mySongs-lyrics-field' onChange={(e) => setBody(e.target.value)} value={body} />
                        </form>
                        <form onSubmit={handleDelete}>
                            <button type='submit'>Delete Song</button>
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
                           <span>Visits: {`${song?.visits}`}</span> <br />
                           <span>Created: {`${song?.createdAt}`}</span> <br />
                           <span>Updated: {`${song?.updatedAt}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditSongPage;
