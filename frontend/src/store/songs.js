import { csrfFetch } from './csrf';

const SET_SONGS = 'songs/setSongs';
const GET_SONGS = 'songs/getSongs';

const initialState = {};

//? action creators
export const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    };
};

export const setSongs = (songs) => ({
    type: SET_SONGS,
    songs
})


//? thunks

export const homeSongs = () => async dispatch => {
    const response = await fetch(`/erudite/songs`);
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
}

export const getSongsThunk = (id) => async dispatch => {
    const response = await fetch(`erudite/songs/${id}`);
    if (response.ok) {
        const songPage = await response.json();
        dispatch(getSongs(songPage))
    }
}

//? reducer
const songReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SONGS: {
            const song = { ...action.song }
            return song;
        }
        case SET_SONGS: {
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
