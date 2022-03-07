import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import SongPage from './components/SongPage';
import AddSong from './components/AddSongPage';
import MySongsPage  from './components/MySongsPage';
import EditSong from './components/EditSongPage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/my-songs' element={<MySongsPage />} />
          <Route path='/songs/:title' element={<SongPage />} />
          <Route path='/add' element={<AddSong />} />
          <Route path='/edit/:id' element={<EditSong />} />
          <Route path='/login' element={<LoginFormPage />} />
          <Route path='/signup' element={<SignupFormPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
