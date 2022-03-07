import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [activePage] = useState('main');
  const [query, setQuery] = useState('');

  const demoLoginHandler = async (e) => {
    await dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }));
    history.push('/my-songs');
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} query={query} setQuery={setQuery} activePage={activePage} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className='nav-links'>Log In</NavLink>
        <NavLink to="/signup" className='nav-links'>Sign Up</NavLink>
        <button onClick={demoLoginHandler}>Demo User</button>
      </>
    );
  }

  return (
    <ul id='nav-links-ul'>
      <li id='nav-links-li'>
        <NavLink to="/" className='nav-links'>Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
