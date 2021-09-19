import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import SongPage from './components/SongPage';
import AddSong from './components/AddSongPage';
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
        <Switch>
          <Route exact path='/'><HomePage /></Route>
          <Route path='/songs'><SongPage /></Route>
          <Route path='/add'><AddSong /></Route>
          <Route path='/edit/:id'><EditSong /></Route>
          <Route path='/login'><LoginFormPage /></Route>
          <Route path='/signup'><SignupFormPage /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
