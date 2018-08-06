import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import restaurants from "./restaurantReducer";

const authPersistConfig = {
  key: "userReducer",
  storage: storage
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  restaurants
});

export default rootReducer;
