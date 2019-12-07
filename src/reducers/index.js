import { combineReducers } from 'redux';
import UserReducer from './UserReducer';


const allReducers = combineReducers({
    user: UserReducer
});

export default allReducers;