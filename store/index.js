import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import postReducer from "./posts";
import thunk from "redux-thunk";
import logger from "redux-logger";

const initialState = {};
const middleware = [thunk, logger];

export default createStore(
  combineReducers({
    post: postReducer,
  }),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
