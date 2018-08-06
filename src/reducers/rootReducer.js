import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import restaurantReducer from "./restaurantReducer";

const authPersistConfig = {
  key: "userReducer",
  storage: storage
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  restaurantReducer
});

export default rootReducer;
