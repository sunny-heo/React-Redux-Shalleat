import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { TabBar, Tab } from "rmwc/Tabs";

class Navbar extends Component {
  state = {
    activeTabIndex: 0,
    navigateTo: null
  };

  navigateTo = path => () => this.props.history.push(path);

  render() {
    return (
      <header className="Navbar">
        <nav className="navbar navbar-dark bg-dark">
          <TabBar
            activeTabIndex={this.state.activeTabIndex}
            onChange={evt =>
              this.setState({ activeTabIndex: evt.detail.activeTabIndex })
            }
          >
            <Tab onClick={this.navigateTo("sign_in")}>Sign In</Tab>
            <Tab onClick={this.navigateTo("sign_up")}>Sign Up</Tab>
          </TabBar>
        </nav>
      </header>
    );
  }
}

export default withRouter(Navbar);
