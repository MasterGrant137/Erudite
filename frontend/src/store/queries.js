import { csrfFetch } from './csrf';

const GET_MY_SONGS = 'songs/getMySongs';
const SET_SONG = 'queries/setSong';
const REMOVE_SONG = 'queries/removeSong';

const getMySongs = (mySongs) => {
  return {
      type: GET_MY_SONGS,
      mySongs
  }
}

const setSong = (song) => {
  return {
    type: SET_SONG,
    payload: song,
  };
};

const removeSong = () => {
  return {
    type: REMOVE_SONG,
  };
};

export const mySongs = () => async dispatch => {
  const response = await csrfFetch(`/erudite/songs/my-songs`);
  if (response.ok) {
      const mySongs = await response.json();
      dispatch(getMySongs(mySongs));
  }
}

export const newSong = (song) => async dispatch => {
  const response = await csrfFetch('/erudite/songs', {
    method: 'POST',
    body: JSON.stringify(song)
  });

  if (response.ok) {
    const newSong = await response.json();
    dispatch(setSong(newSong));
    return newSong;
  }
}

export const editSong = (song) => async dispatch => {
  const response = await csrfFetch(`/erudite/songs/${song.id}/edit`, {
    method: 'PATCH',
    body: JSON.stringify(song)
  });

  if (response.ok) {
    const newSong = await response.json();
    dispatch(setSong(newSong));
    return newSong;
  }
}

export const deleteSong = (id) => async dispatch => {
  console.log(`THIS IS THE ID`,id);

  const response = await csrfFetch(`/erudite/songs/${id}/delete`, {
    method: 'DELETE',
  });
    const data = await response.json();
    dispatch(removeSong(data))
    return data;
  }

export const addComment = (comment) => async dispatch => {
  const response = await csrfFetch(`/erudite/comments`, {
    method: 'POST',
    body: JSON.stringify(comment)
  });

  if (response.ok) {
    const newComment = await response.json();
    dispatch(setSong(newComment));
    return newComment;
  }
}

const initialState = { song: null };

const queriedSongsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_MY_SONGS:
        const newMySongs = {};
        action.mySongs.forEach(mySong => newMySongs[mySong.id] = mySong)
        return {...state,...newMySongs}
      case SET_SONG:
        newState = Object.assign({}, state);
        newState.song = action.payload;
        return newState;
      case REMOVE_SONG:
        newState = Object.assign({}, state);
        newState.song = null;
        return newState;
      default:
        return state;
    }
  };



export default queriedSongsReducer;
