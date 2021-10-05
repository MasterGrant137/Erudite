import { csrfFetch } from './csrf';

const GET_SONGS = 'songs/getSongs';


//? action creators
const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    };
};

//? thunks
export const homeSongs = () => async dispatch => {
    const response = await csrfFetch(`/erudite/songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
}

export const mySongs = () => async dispatch => {
    const response = await csrfFetch(`/erudite/my-songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
}

export const songPage = (title) => async dispatch => {
    const response = await csrfFetch(`/erudite/songs/${title}/lyrics`)
    if (response.ok) {
        const song = await response.json();
        console.log(`THIS IS THE SONG IN STORE`,song);
        dispatch(getSongs(song));
    }
}

export const getComments = (title) => async dispatch => {
    const response = await csrfFetch(`/erudite/comments/${title}`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(getSongs(comments));
    }
}

const initialState = {};

//? reducer
const songReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SONGS: {
            const newSongs = {};

            action.songs.forEach(song => {
                newSongs[song.id] = song;
            })

            return {...state,...newSongs};
        }
        default: return state;
    }
}

export default songReducer;
