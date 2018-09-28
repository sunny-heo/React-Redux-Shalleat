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
import { CircularPending, LocationPending } from "../utils";

import NavSearchForm from "./NavSearchForm";

const styles = theme => ({
  flex: {
    flex: 1
  },
  appBar: {
    color: "#424242",
    background: "white",
    boxShadow:
      "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
  },
  navItemContainer: {
    display: "flex",
    alignItems: "center"
  }
});

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
  withState("activeTabIndex", "setActiveTabIndex", 0),
  withState("selectedBtn", "setSelectedBtn", null),
  withState("revealInput", "setRevealInput", false),
  withHandlers({
    handleSignOut: props => evt => {
      evt.preventDefault();
      props.dispatch(signOutUser());
    },
    handleSearchIcon: props => evt => {
      evt.preventDefault();
      const { revealInput, setRevealInput } = props;
      setRevealInput(!revealInput);
    },
    handleNavigateTo: props => path => evt => {
      evt.preventDefault();
      props.history.push(path);
    }
  })
);

const SwitchComponent = enhance(props => {
  const {
    classes,
    user,
    restaurants,
    history,
    revealInput,
    handleSignOut,
    handleSearchIcon,
    handleNavigateTo
  } = props;

  const { signedIn, pendingSignIn, pendingSignUp, pendingSignOut } = user;
  const {
    pendingGetRestaurants: pending,
    gotRestaurants: success,
    keyword,
    list
  } = restaurants;

  switch (true) {
    case pendingSignIn:
    case pendingSignUp:
    case pendingSignOut:
      return <CircularPending height="40" width="40" />;

    case signedIn && history.location.pathname === "/map":
      return (
        <Fragment>
          <div className={classes.navItemContainer}>
            <NavSearchForm
              classes={classes}
              keyword={keyword}
              pending={pending}
              success={success}
              resultLength={list.length}
              revealInput={revealInput}
              handleSearchIcon={handleSearchIcon}
            />
            <Btn name="Sign out" onClick={handleSignOut} />
          </div>
        </Fragment>
      );
    case signedIn:
      return <Btn name="Sign out" onClick={handleSignOut} />;

    default:
      return (
        <Fragment>
          <Btn
            name="Sign in"
            onClick={handleNavigateTo("/sign_in")}
            currentPath={history.location.pathname === "/sign_in"}
          />
          <Btn
            name="Sign up"
            onClick={handleNavigateTo("/sign_up")}
            currentPath={history.location.pathname === "/sign_up"}
          />
        </Fragment>
      );
  }
});

const Navbar = enhance(props => {
  const { classes, pendingGetLocation } = props;
  return (
    <Fragment>
      <AppBar className={classes.appBar} position="static" elevation={0}>
        <Toolbar>
          <Typography className={classes.flex} type="title" color="inherit">
            What Shall We Eat?
          </Typography>
          <SwitchComponent />
        </Toolbar>
      </AppBar>
      <LocationPending pending={pendingGetLocation} color="primary" />
    </Fragment>
  );
});

export default Navbar;
