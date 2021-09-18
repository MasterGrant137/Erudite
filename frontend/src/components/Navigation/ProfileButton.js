import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user, query, setQuery, activePage }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);


  const handleXClick = () => {
      console.log(`THIS IS BEFORE ERASURE: ${query}`);
      setQuery('');
    }

    const handleInputChange = (e) => {
      console.log(`THIS IS RIGHT AFTER CHANGE: ${e.target.value}`);
      e.preventDefault();
      setQuery(e.target.value);
    }

    const onSubmit = (e) => {
      e.preventDefault();
      // console.log(`This is after submit: ${query}`);
      // const searchInput = e.target.children[0];
      // const searchInputID = searchInput.id;
      // let query = searchInput.value;
      // console.log(query);
      // history.push(`search/${query}`)
      // setQuery(e.target.value)
      console.log(`then I'm hit with this as a query: ${query} and this as a value: ${e.target.value}`);
      console.log(`furthermore, this is window.location: ${window.location} and origin: ${window.origin}`);

      if (`${window.location}`.includes('/search')) {
        history.push(`${query}`)
      } else if (!`${window.location}`.includes('/search')) {
        history.push(`search/${query}`)
      }
    }


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

// onChange={(e) => setQuery(e.target.value)}

// onClick={handleXClick}
  return (
    <>
      <button onClick={!showMenu ? () => setShowMenu(true) : () => setShowMenu(false)} id='nav-menu-reveal-btn'>🏡</button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <form method='GET' onSubmit={onSubmit}>
              <button onClick={handleXClick} type='button'>X</button>
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
