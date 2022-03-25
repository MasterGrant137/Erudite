import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as queryActions2 from '../../store/queries-2';
import { useNavigate } from 'react-router-dom';
import '../../auth.css';
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState('hidden-home-lyrics');
  const [size, setSize] = useState('big-home-video');

  useEffect(() => {
    dispatch(queryActions2.homeSongs());
  }, [dispatch])

  const songs = useSelector(state => {
    return state.topSongs;
  })

  const clickHandler = (e) => {
    e.preventDefault();
    navigate(`songs/${e.target.title}/lyrics`);
  }

  const songAndLyricsDiv = Object.values(songs).map(song => (
    <div key={song?.id} onClick={clickHandler}>
      <img
        id={size}
        className='home-video'
        src={song?.coverArt}
        alt={song.title}
        title={song.title}
        onMouseOver={() => {
          setVisibility('visible-home-lyrics');
          setSize('small-home-video');
        }}
        onMouseOut={() => {
          setVisibility('hidden-home-lyrics');
          setSize('big-home-video');
        }}
        onClick={() => navigate(`songs/${song.title}/lyrics`)}
        crossOrigin={process.env.NODE_ENV === 'production' ? 'anonymous' : undefined}
      />
      <textarea
        id={visibility}
        value={song.body}
        title={song.title}

        onMouseOver={(e) => {
          setVisibility('visible-home-lyrics');
          setSize('small-home-video');
        }}
        onMouseOut={() => {
          setVisibility('hidden-home-lyrics');
          setSize('big-home-video');
        }}
        disabled
      />
    </div>
  ));

  return (
    <div id='home-page-container'>
      <div id='background-color-wrapper'>
        <div id='home-headers-container'>
          <div id='home-page-header'>Erudite</div>
          <div id='song-visits-header'>Top Songs</div>
        </div>
        <div id='home-carousel'>
          {songAndLyricsDiv}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
