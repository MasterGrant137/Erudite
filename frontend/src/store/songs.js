import { csrfFetch } from './csrf';

const GET_SONGS = 'songs/getSongs';

const initialState = {};

//? action creators
const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    };
};

//? thunks
export const homeSongs = () => async dispatch => {
    const response = await fetch(`/erudite/songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
}

export const mySongs = () => async dispatch => {
    const response = await fetch(`/erudite/my-songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
}

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
