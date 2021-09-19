import { csrfFetch } from './csrf';

const SET_SONG = 'queries/setUser';
const REMOVE_SONG = 'queries/removeUser';

const setSong = (song) => {
  return {
    type: SET_SONG,
    payload: song,
  };
};

// const removeSong = () => {
//   return {
//     type: REMOVE_SONG,
//   };
// };

export const newSong = (song) => async dispatch => {
  const { artist, title, producer, body, media, coverArt } = song;
  const response = await csrfFetch('/erudite/songs', {
    method: 'POST',
    body: JSON.stringify({
      artist,
      title,
      producer,
      body,
      media,
      coverArt
    }),
  });
  const data = await response.json();
  dispatch(setSong(data.song));
  return response;
}

// export const login = (user) => async dispatch => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/erudite/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

// export const logout = () => async (dispatch) => {
//   const response = await csrfFetch('/erudite/session', {
//     method: 'DELETE',
//   });
//   dispatch(removeUser());
//   return response;
// };

// export const restoreUser = () => async dispatch => {
//   const response = await csrfFetch('/erudite/session');
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// }

const initialState = { song: null };

const sessionReducer = (state = initialState, action) => {
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

export default sessionReducer;



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
