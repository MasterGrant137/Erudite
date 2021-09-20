import { csrfFetch } from './csrf';

const SET_SONG = 'queries/setSong';
const REMOVE_SONG = 'queries/removeSong';

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

  const response = await csrfFetch(`/erudite/songs/${id}`, {
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

const addSongReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
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

export default addSongReducer;



// const SEARCH_SONGS = 'songs/searchSongs';

// const initialState = {};

// //? action creators
// const searchSongs = (queries) => {
//     return {
//         type: SEARCH_SONGS,
//         queries
//     }
// }

// //? thunks
// export const queriedSongs = () => async dispatch => {
//     const response = await fetch(`/erudite/my-songs/`);
//     if (response.ok) {
//         const results = await response.json();
//         dispatch(searchSongs(results));
//     }
// }

// //? reducer
// const queriedSongsReducer = (state = initialState, action) => {

//     switch (action.type) {
//         case SEARCH_SONGS: {
//             const queryResults = {};

//             action.songs.forEach(song => {
//                 queryResults[song.id] = song;
//             })
//             return {...state,...queryResults};
//         }
//         default: return state;
//     }
// }

// export default queriedSongsReducer;
