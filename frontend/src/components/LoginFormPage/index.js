import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../auth.css';


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
      <div className='auth-wrapper'>
        <div className='auth-form-container'>
          <form onSubmit={handleSubmit} className='auth-form'>
            <ul hidden={!errors.length ? true : false}>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
              <p>Login</p>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder='username or email'
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='password'
              />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
}

export default LoginFormPage;
