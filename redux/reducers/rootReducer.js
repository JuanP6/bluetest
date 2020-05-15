import gifsReducer from './gifsReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    gifs: gifsReducer
});

export default rootReducer;
