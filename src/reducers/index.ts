import { combineReducers } from "redux"
import { connectRouter } from 'connected-react-router'
import {History} from 'history';
import authReducer from './authReducer';
import registerReducer from './registerReducer';
import itemReducer from './itemReducer';

export const rootReducer = (history: History<any>) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    register: registerReducer,
    items: itemReducer,
});

export default rootReducer;
