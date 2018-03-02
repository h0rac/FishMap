import { combineReducers } from 'redux';
import fishmarks from './fishmarks';
import user from './user';

export default combineReducers({
    fishmarks, user,
});
