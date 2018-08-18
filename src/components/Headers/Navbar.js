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
import AuthPending from "../pendings/CircularPending";
import LocationPending from "../pendings/LocationPending";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";

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
  }
});

const mapStateToProps = (state, nextOwnProps) => state.user;

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
  withState("activeTabIndex", "setActiveTabIndex", 0),
  withState("selectedBtn", "setSelectedBtn", null),
  withState("openSearchBar", "setOpenSearchBar", false),
  withHandlers({
    handleNavigateTo: props => path => evt => {
      evt.preventDefault();
      props.history.push(path);
    },
    handleSignOut: props => evt => {
      evt.preventDefault();
      props.dispatch(signOutUser());
    },
    handleSearchIcon: props => evt => {
      evt.preventDefault();
      const { openSearchBar, setOpenSearchBar } = props;
      setOpenSearchBar(!openSearchBar);
    }
  })
);

const SwitchComponent = enhance(props => {
  const {
    history,
    signedIn,
    pendingSignIn,
    pendingSignUp,
    pendingSignOut,
    handleNavigateTo,
    handleSignOut,
    openSearchBar,
    handleSearchIcon
  } = props;

  switch (true) {
    case pendingSignIn:
    case pendingSignUp:
    case pendingSignOut:
      return <AuthPending style={{ height: "40px", width: "40px" }} />;

    case signedIn && history.location.pathname === "/map":
      return (
        <Fragment>
          <IconButton
            className=""
            aria-label="MainSearch"
            onClick={handleSearchIcon}
          >
            <SearchIcon />
          </IconButton>
          <Zoom in={openSearchBar} timeout={{ enter: 500, exit: 500 }}>
            <div
              style={openSearchBar ? { display: "block" } : { display: "none" }}
            >
              <NavSearchForm style={{ width: "200px" }} />
            </div>
          </Zoom>
          <Btn name="Sign out" onClick={handleSignOut} />
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
