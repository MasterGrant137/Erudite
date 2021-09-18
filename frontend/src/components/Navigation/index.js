import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [activePage, setActivePage] = useState('main');
  const [query, setQuery] = useState('');

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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
        <NavLink exact to="/" className='nav-links'>Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
