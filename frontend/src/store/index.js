import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import queriedSongsReducer from './queries-1';
import {topSongsReducer, songReducer} from './queries-2';

const rootReducer = combineReducers({
  //? reducer state keys and values
  session: sessionReducer,
  topSongs: topSongsReducer,
  song: songReducer,
  queriedSongs: queriedSongsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
