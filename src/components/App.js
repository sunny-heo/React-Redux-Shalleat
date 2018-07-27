import React, { Component } from "react";
import { connect } from "react-redux";
import service from "../_requests/AxiosService";
import { fetchUser } from "../actions/userAction";

import "../styles/css/App.css";

const mapStateToProps = (state, action) => {
  return {
    user: state.userReducer.user,
    userFetching: state.userReducer.fetching,
    userFetched: state.userReducer.fetched
  };
};

class App extends Component {
  render() {
    console.log("this.props => ", this.props);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={async e => {
            const data = await service.post("/restaurants/all", {
              lat: 49.282205100000006,
              lng: -123.1084132,
              radius: 1500
            });
            console.log(data);
          }}
        >
          trigeer
        </button>
        <button
          onClick={e => {
            this.props.dispatch(fetchUser());
          }}
        >
          Sign in
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
