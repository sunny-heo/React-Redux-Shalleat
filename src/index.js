import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import storage from "./store";
import { PersistGate } from "redux-persist/integration/react";

import "material-components-web/dist/material-components-web.min.css";
import "daemonite-material/css/material.css";
import "./styles/css/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  // overrides: {
  palette: {
    // type: "dark",
    primary: {
      main: "#424242"
    },
    secondary: {
      main: "#fff"
    }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:after": {
          borderBottomColor: "#ff4081"
        }
      }
    },
    MuiTab: {
      root: {
        color: "rgba(200, 200, 200, 0.54) !important"
      },
      selected: {
        color: "white !important"
      }
    }
  }
});

const { store, persistor } = storage();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
