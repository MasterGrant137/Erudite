import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [activePage] = useState('main');
  const [query, setQuery] = useState('');

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
