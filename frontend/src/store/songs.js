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

export const songPage = (title) => async dispatch => {
    // console.log("TITLE", title);
    const response = await fetch(`/erudite/songs/${title}/lyrics`)
    if (response.ok) {
        const song = await response.json();
        console.log(`THIS IS THE SONG IN STORE`,song);
        dispatch(getSongs(song));
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
