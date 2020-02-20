import { combineReducers } from 'redux';
import sentenceReducer from './sentenceReducer';
import userReducer from './userReducer';


export default combineReducers({
    sentences: sentenceReducer,
    user: userReducer
});