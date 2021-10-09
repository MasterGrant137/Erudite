import { csrfFetch } from './csrf';

//? types
const GET_SONGS = 'songs/getSongs';
const GET_COMMENTS = 'songs/getComments';

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
        dispatch(getSongs(song));
    }
}

export const getCommentSection = (title) => async dispatch => {
    const response = await csrfFetch(`/erudite/comments/${title}/list`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(getComments(comments));
    }
}

const initialState = {};

//? reducer
const songReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SONGS:
            const newSongs = {};
            action.payload.forEach(song => {
                newSongs[song.id] = song;
            })
            return {...state,...newSongs};
        case GET_COMMENTS:
            const newState = Object.assign({}, state);
            action.payload.forEach(comment => newState[comment.id] = comment);
            return {...state,...newState}
        default: return state;
    }
}

export default songReducer;
