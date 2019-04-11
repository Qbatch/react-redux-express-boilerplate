// src/js/store/index.js
import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducers/index";
//import {createLogger} from 'redux-logger'

//const logger = createLogger({
 /// duration:true
//});

const store = createStore(rootReducer,applyMiddleware(thunk));
export default store;