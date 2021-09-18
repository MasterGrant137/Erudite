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
    const response = await fetch(`/erudite/songs/search/`);
    if (response.ok) {
        const results = await response.json();
        dispatch(searchSongs(results));
    }
}

//? reducer
const queriedSongsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEARCH_SONGS: {
            const queryResults = {};

            action.queries.forEach(query => {
                queryResults[query.id] = query;
            })
            return {...state,...queryResults};
        }
        default: return state;
    }
}

export default queriedSongsReducer;
