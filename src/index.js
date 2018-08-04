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
      main: "#424242"
    },
    secondary: {
      main: "#fff"
      // light: "#0066ff"
      // main: "#40ffbe"
    }
  }
  // overrides: {
  //   MuiButton: {
  //     root: {
  //       background: "#ff4081",
  //       color: "balck",
  //       borderRadius: 2
  //     }
  //   }
  // },
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
