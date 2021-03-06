import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const signup = (user) => async dispatch => {
  const { username, email, password } = user;
  const response = await csrfFetch('/erudite/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      email
    }),
  });
  const data = await response.json();
  await dispatch(setUser(data.user));
  return response;
}

export const login = (user) => async dispatch => {
  const { credential, password } = user;
  const response = await csrfFetch('/erudite/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  await dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/erudite/session', {
    method: 'DELETE',
  });
  await dispatch(removeUser());
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/erudite/session');
  const data = await response.json();
  await dispatch(setUser(data.user));
  return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
