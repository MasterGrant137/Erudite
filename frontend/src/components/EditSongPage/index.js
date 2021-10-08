import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editSong, deleteSong } from '../../store/queries';
import './EditSongPage.css'

export const EditSongPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
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
    const [size, setSize] = useState('big-mySongs-card');

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
                    <div>
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
                        >
                        <form onSubmit={handleSubmit}>
                            <input data-ms-input='title' onChange={(e) => setTitle(e.target.value)} value={title} />
                            <input data-ms-input='artist' onChange={(e) => setArtist(e.target.value)} value={artist} />
                            <input data-ms-input='producer' onChange={(e) => setProducer(e.target.value)} value={producer} />
                            <input data-ms-input='media' onChange={(e) => setMedia(e.target.value)} value={media} />
                            <input data-ms-input='cover-art' onChange={(e) => setCoverArt(e.target.value)} value={coverArt} />
                            <button type='submit'>Submit</button>
                            <textarea data-ms-input='body' onChange={(e) => setBody(e.target.value)} value={body} />
                        </form>
                        <form onSubmit={handleDelete}>
                            <button type='submit'>Delete Song</button>
                        </form>
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
                </div>
            </div>
        </div>
    );
}

export default EditSongPage;
