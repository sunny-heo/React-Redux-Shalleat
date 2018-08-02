import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, withState, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
    marginLeft: 8,
    marginRight: 8
  },
  appBar: {
    color: "white",
    background: "linear-gradient(to right, #5433ff, #20bdff)"
  }
});

const mapStateToProps = (state, nextOwnProps) => state.userReducer;

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
  withState("activeTabIndex", "setActiveTabIndex", 0),
  withHandlers({
    handleNavigateTo: props => path => evt => {
      evt.preventDefault();
      console.log(props);
      props.history.push(path);
    }
  })
);

const Navbar = enhance(props => {
  const { classes, handleNavigateTo, pendingGetLocation } = props;
  return (
    <AppBar className={classes.appBar} position="static" elevation={0}>
      <Toolbar>
        <Typography className={classes.flex} type="title" color="inherit">
          What Shall We Eat?
        </Typography>
        <Button
          className={classes.authButton}
          onClick={handleNavigateTo("/sign_in")}
        >
          Sign in
        </Button>
        <Button
          className={classes.authButton}
          onClick={handleNavigateTo("/sign_up")}
        >
          Sign up
        </Button>
      </Toolbar>
      {pendingGetLocation ? <LocationPending /> : null}
    </AppBar>
  );
});

export default Navbar;
