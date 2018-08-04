import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import "material-components-web/dist/material-components-web.min.css";
import "daemonite-material/css/material.css";
import "./styles/css/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  // overrides: {
  palette: {
    type: "dark",
    primary: {
      // main: "#f0ffff"
      main: "#ff4081"
    },
    secondary: {
      main: "#4081ff"
      // light: "#0066ff"
      // main: "#40ffbe"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        background: "#ff4081",
        color: "white",
        borderRadius: 2
      }
    }
  },
  boxShadow:
    "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
});

ReactDOM.render(
  <Provider store={store()}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
