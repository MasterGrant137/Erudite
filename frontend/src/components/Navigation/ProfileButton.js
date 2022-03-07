import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom";

const ProfileButton = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState('')

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    window.location = `${window.location.origin}/songs/${query}/lyrics` 
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
    window.location.reload();
  };

  return (
    <>
      <button onClick={!showMenu ? () => setShowMenu(true) : () => setShowMenu(false)} id='nav-menu-reveal-btn'>🏡</button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username} | {user.email}</li>
          <li><Link to='/add'><button>Add Song</button></Link></li>
          <li><Link to='/my-songs'><button>My Songs</button></Link></li>
          <li>
            <form method='GET' onSubmit={onSubmit}>
              <input
                type='search'
                value={query}
                onChange={handleInputChange}
                />
            </form>
          </li>
          <li><button onClick={logout}>Log Out</button></li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
