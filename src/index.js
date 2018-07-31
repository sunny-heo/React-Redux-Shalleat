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
  typography: {
    fontSize: 14
  },
  palette: {
    primary: {
      main: "#f0ffff"
    },
    secondary: {
      main: "#40ffbe"
    },
    tonalOffset: 0
  }
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
