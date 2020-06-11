import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";

import fabReducer from "./myfabmoments";
import userReducer from "./user";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleware = [thunk, logger];

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    myfabmoments: fabReducer,
    user: userReducer,
  })
);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);

const makeStore = () => store;
export default createWrapper(makeStore);
