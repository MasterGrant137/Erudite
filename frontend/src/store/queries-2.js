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

//? reducers
const initialState1 = {};
export const topSongsReducer = (state = initialState1, action) => {

    switch (action.type) {
        case GET_SONGS:
            state = {};
            const newSongs = {};
            Object.values(action.payload).forEach(song => {
                newSongs[song.id] = song;
            })
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
