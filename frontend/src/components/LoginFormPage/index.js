import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
      <Redirect to="/" />
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    return (
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='login-form'>
          <ul hidden={!errors.length ? true : false}>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
            <p>Login</p>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder='username or password'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='password'
            />
          <button type="submit" id='login-button'>Log In</button>
        </form>
      </div>
    );
}

export default LoginFormPage;
