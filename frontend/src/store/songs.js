import { csrfFetch } from './csrf';

const GET_SONGS = 'songs/getSongs';
const SEARCH_SONGS = 'songs/searchSongs';

const initialState = {};

//? action creators
const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    };
};

const searchSongs = (query) => {
    return {
        type: SEARCH_SONGS,
        query
    }
}

//? thunks
export const homeSongs = () => async dispatch => {
    const response = await fetch(`/erudite/songs/`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
}

export const queriedSongs = () => async dispatch => {
    const titleRegex = '/:id(\\d+)';
    const response = await fetch(`erudite/songs/${titleRegex}`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(searchSongs(songs));
    }
}

//? reducer
const songReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SONGS: {
            const newSongs = {};

            action.songs.forEach(ele => {
                newSongs[ele.id] = ele;
            })

            return {...state,...newSongs};
        }
        default: return state;
    }
}

export default songReducer;
