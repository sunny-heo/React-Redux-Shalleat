import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import promise from "redux-promise-middleware";

const middleware = applyMiddleware(promise(), thunk, createLogger());

export default function store(initialState = {}) {
  return createStore(rootReducer, initialState, middleware);
}
