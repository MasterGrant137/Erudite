import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user, query, setQuery, activePage }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const handleXClick = () => {
    setQuery('');
  }

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const searchInput = e.target.children[0];
  //   const searchInputID = searchInput.id;
  //   let query = searchInput.value;
  //   // history.push(`erudite/songs/?=${query}`)
  //   // query = '';
  // }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

//   <form
//   action='/'
//   method='get'
//   autoComplete='off'
//   onSubmit={onSubmit}
// />


  return (
    <>
      <button onClick={!showMenu ? () => setShowMenu(true) : () => setShowMenu(false)} id='nav-menu-reveal-btn'>🏡</button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <form>
              <button onClick={handleXClick}>X</button>
              <input type='search' value={query} onChange={(e) => setQuery(e.target.value)} />
            </form>
          </li>
          <li><button onClick={logout}>Log Out</button></li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
