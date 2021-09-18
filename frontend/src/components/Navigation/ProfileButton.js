import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const history = useHistory();
  const { query } = useParams();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`?s=${query}`)
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={!showMenu ? () => setShowMenu(true) : () => setShowMenu(false)} id='nav-menu-reveal-btn'>🏡</button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <form
              action='/'
              method='get'
              autoComplete='off'
              onSubmit={onSubmit}
            >
              <input type='search'></input>
            </form>
          </li>
          <li><button onClick={logout}>Log Out</button></li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
