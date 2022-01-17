import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [activePage] = useState('main');
  const [query, setQuery] = useState('');

  const demoLoginHandler = async (e) => {
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
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
        <NavLink to="/my-songs" className='nav-links' onClick={demoLoginHandler}>
            Demo User
        </NavLink>
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
