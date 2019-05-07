import { createStore, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import ReduxThunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers/rootReducer";
import { persistStore } from "redux-persist";

const middleware = applyMiddleware(promise, ReduxThunk, createLogger);
// const middleware = [promise(), thunk, createLogger()];

export default (initialState = {}) => {
  let store = createStore(rootReducer, initialState, middleware);
  let persistor = persistStore(store);
  return { store, persistor };
};
