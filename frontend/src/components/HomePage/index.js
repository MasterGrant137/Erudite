import './HomePage.css'
import { homeSongs } from '../../store/songs';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../auth.css';
import { useEffect } from 'react';

const HomePage = () => {
    const dispatch = useDispatch();

    const songs = useSelector(state => {
        console.log(state);
        return state.songs;
    })

    useEffect(() => {
        dispatch(homeSongs())
    }, [dispatch])

    const songDiv = Object.values(songs).map(song => (
        <textarea key={song.id} value={song.body} />
    ))

    return (
        // <div className='home-page-container'>
        //    <img src='https://images.genius.com/82646d80bd948c23d78cdf246798f9c8.640x480x1.jpg\' />
        // </div>
        <div className='home-page-container'>
        <div id='home-page-header'>Erudite</div>
        <div id='songs-div'>{songDiv}</div>
      </div>
    );
}

export default HomePage;
