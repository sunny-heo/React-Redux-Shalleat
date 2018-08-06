import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers/rootReducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const middleware = applyMiddleware(promise(), thunk, createLogger());

// const persistConfig = {
//   key: "root",
//   storage
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer)

export default (initialState = {}) => {
  let store = createStore(rootReducer, initialState, middleware);
  let persistor = persistStore(store);
  return { store, persistor };
};
