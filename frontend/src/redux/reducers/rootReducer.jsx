import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import postReducer from './post/PostReducer';

const rootReducer=combineReducers({
    user:userReducer,
    post:postReducer
});

export default rootReducer;