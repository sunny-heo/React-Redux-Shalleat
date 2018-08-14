import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import userReducer from "./userReducer";
import restaurants from "./restaurantReducer";

const authPersistConfig = {
  key: "userReducer",
  storage: storageSession
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  restaurants
});

export default rootReducer;

// window.onbeforeunload = function (e)
//         {

//             e = e || window.event;
//             var y = e.pageY || e.clientY;
//             if (y < 0){
//             return "Do You really Want to Close the window ?"
//             }
//             else {
//             return "Refreshing this page can result in data loss.";
//             }

//           }
