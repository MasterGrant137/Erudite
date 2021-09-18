
const SEARCH_SONGS = 'songs/searchSongs';

const initialState = {};

//? action creators
const searchSongs = (queries) => {
    return {
        type: SEARCH_SONGS,
        queries
    }
}

//? thunks
export const queriedSongs = () => async dispatch => {
    // const titleRegex = '/:id(\\d+)';
    // const titleRegex = '1';
    const response = await fetch(`erudite/songs/breakthrough`);
    if (response.ok) {
        const queries = await response.json();
        dispatch(searchSongs(queries));
    }
}

//? reducer
const queriedSongsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEARCH_SONGS: {
            const queryResults = {};

            action.songs.forEach(song => {
                queryResults[song.id] = song;
            })
            return {...state,...queryResults};
        }
        default: return state;
    }
}

export default queriedSongsReducer;
