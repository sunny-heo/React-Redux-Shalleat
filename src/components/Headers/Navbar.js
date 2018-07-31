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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
  }
});

class Navbar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="contrast"
            onClick={this.props.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.flex} type="title" color="inherit">
            Material-UI Demo App
          </Typography>
          <div>
            <IconButton color="contrast" onClick={this.props.login}>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
