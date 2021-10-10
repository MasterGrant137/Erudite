import { csrfFetch } from './csrf';

//? types
const GET_SONGS = 'songs/getSongs';
const GET_COMMENTS = 'queries/getComments';

//? action creators
const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        payload: songs
    };
};

const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
  }

//? thunks
//? pass data received from components to action creators
export const homeSongs = () => async dispatch => {
    const response = await csrfFetch(`/erudite/songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
}

export const songPage = (title) => async dispatch => {
    const response = await csrfFetch(`/erudite/songs/${title}/lyrics`)
    if (response.ok) {
        const song = await response.json();
        console.log('SONG PAGE RESPONSE', song);
        dispatch(getSongs(song));
    }
}

export const commentSection = (title) => async dispatch => {
    const response = await csrfFetch(`/erudite/comments/${title}/list`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(getComments(comments));
    }
  }

//? reducers
//? control how action creators' data is presented in the Redux store
const initialState1 = {};
export const topSongsReducer = (state = initialState1, action) => {

    switch (action.type) {
        case GET_SONGS:
            state = {};
            const newSongs = {};
            Object.values(action.payload).forEach(song => newSongs[song.id] = song);
            return {...state,...newSongs};
        default: return state;
    }
}

const initialState2 = {};
export const songReducer = (state = initialState2, action) => {
    switch (action.type) {
        case GET_SONGS:
            state = {};
            const newSongs = {};
            newSongs[action.payload.id] = action.payload;
            return {...state,...newSongs};
        default: return state;
    }
}

const initialState3 = {};
export const commentsReducer = (state = initialState3, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            state = {};
            const newComments = {};
            action.payload.forEach(comment => newComments[comment.id] = comment);
            return {...state,...newComments};
        default: return state;
    }
}
