import { combineReducers } from 'redux';
import authReducer from "./user.reducer";
import pageReducer from "./page.reducer";

const reducers = combineReducers({
    auth: authReducer,
    page: pageReducer
});

export default reducers;