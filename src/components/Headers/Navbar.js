import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, withState, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import { signOutUser } from "../../actions/userAction";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Btn from "../common/Button";
import AuthPending from "../pendings/AuthPending";
import LocationPending from "../pendings/LocationPending";

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  authButton: {
    border: "1px solid black",
    backgroundColor: "transparent",
    color: "black",
    borderRadius: 2,
    marginLeft: 8,
    marginRight: 8
  },
  appBar: {
    color: "#424242",
    background: "white",
    boxShadow:
      "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
  }
});

const mapStateToProps = (state, nextOwnProps) => state.userReducer;

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
  withState("activeTabIndex", "setActiveTabIndex", 0),
  withState("selectedBtn", "setSelectedBtn", null),
  withHandlers({
    handleNavigateTo: props => path => evt => {
      evt.preventDefault();
      props.history.push(path);
    },
    handleSignOut: props => path => evt => {
      evt.preventDefault();
      props.dispatch(signOutUser());
      props.history.push(path);
    }
  })
);

const SwitchComponent = enhance(props => {
  const {
    location,
    signedIn,
    pendingSignIn,
    pendingSignUp,
    pendingSignOut,
    handleNavigateTo,
    handleSignOut
  } = props;

  switch (true) {
    case pendingSignIn:
    case pendingSignUp:
    case pendingSignOut:
      return <AuthPending height="40" width="40" />;

    case signedIn:
      return <Btn name="Sign out" onClick={handleSignOut("/")} />;

    default:
      return (
        <Fragment>
          <Btn
            name="Sign in"
            handleNavigateTo={handleNavigateTo("/sign_in")}
            currentPath={location.pathname === "/sign_in"}
          />
          <Btn
            name="Sign up"
            handleNavigateTo={handleNavigateTo("/sign_up")}
            currentPath={location.pathname === "/sign_up"}
          />
        </Fragment>
      );
  }
});

const Navbar = enhance(props => {
  const { classes, pendingGetLocation } = props;
  return (
    <Fragment>
      {/* <button
        onClick={() => {
          console.log(props);
        }}
      >
        Navbar button
      </button> */}
      <AppBar className={classes.appBar} position="static" elevation={0}>
        <Toolbar>
          <Typography className={classes.flex} type="title" color="inherit">
            What Shall We Eat?
          </Typography>
          <SwitchComponent />
        </Toolbar>
      </AppBar>
      <LocationPending pending={pendingGetLocation} color="secondary" />
    </Fragment>
  );
});

export default Navbar;
