// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import { TabBar, Tab } from "rmwc/Tabs";

// class Navbar extends Component {
//   state = {
//     activeTabIndex: 0,
//     navigateTo: null
//   };

//   navigateTo = path => evt => {
//     evt.preventDefault();
//     this.props.history.push(path);
//   };

//   render() {
//     return (
//       <header className="Navbar">
//         <nav className="navbar navbar-dark bg-dark">
//           <TabBar
//             activeTabIndex={this.state.activeTabIndex}
//             onChange={evt =>
//               this.setState({ activeTabIndex: evt.detail.activeTabIndex })
//             }
//           >
//             <Tab onClick={this.navigateTo("sign_in")}>Sign In</Tab>
//             <Tab onClick={this.navigateTo("sign_up")}>Sign Up</Tab>
//           </TabBar>
//         </nav>
//       </header>
//     );
//   }
// }

// export default withRouter(Navbar);

import React from "react";
import { withRouter } from "react-router-dom";
import { compose, withReducer, withState, withHandlers } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import userReducer from "../../reducers/userReducer";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: "100%"
  },
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
  }
});

const enhance = compose(
  withRouter,
  withStyles(styles),
  withReducer("state", "dispatch", userReducer),
  withState("activeTabIndex", "setActiveTabIndex", 0),
  withHandlers({
    handleNavigateTo: props => path => evt => {
      evt.preventDefault();
      props.history.push(path);
    }
  })
);

const Navbar = enhance(props => {
  const { classes, handleNavigateTo } = props;

  return (
    <AppBar
      position="static"
      elevation={0}
      style={{
        color: "white",
        background: "linear-gradient(to right, #5433ff, #20bdff)"
      }}
    >
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
    </AppBar>
  );
});

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Navbar;
