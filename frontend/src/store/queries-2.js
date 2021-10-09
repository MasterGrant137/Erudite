import { csrfFetch } from './csrf';

//? types
const GET_SONGS = 'songs/getSongs';

//? action creators
const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        payload: songs
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

export const songPage = (title) => async dispatch => {
    const response = await csrfFetch(`/erudite/songs/${title}/lyrics`)
    if (response.ok) {
        const song = await response.json();
        dispatch(getSongs(song));
    }
}

const initialState = {};

//? reducers
export const topSongsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SONGS:
            const newSongs = {};
            action.payload.forEach(song => {
                newSongs[song.id] = song;
            })
            return {...state,...newSongs};
        default: return state;
    }
}

export const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SONGS:
            const newSongs = {};
            action.payload.forEach(song => {
                newSongs[song.id] = song;
            })
            return {...state,...newSongs};
        default: return state;
    }
}
