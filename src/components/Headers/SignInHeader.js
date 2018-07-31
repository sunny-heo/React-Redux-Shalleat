import React, { Component } from "react";
import { compose, withHandlers, withState } from "recompose";
import PropTypes from "prop-types";

import { withStyles, withTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContainer from "./TabContainer";
import LocalSignIn from "../authentications/LocalSignIn";
import OAuthSignIn from "../authentications/OAuthSignIn";

const styles = theme => {
  console.log("theme => ", theme);
  return {
    SignInHeader: {
      backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    }
  };
};

const enhance = compose(
  withTheme(),
  withStyles(styles),
  withState("value", "setValue", 0),
  withHandlers({
    handleOnChange: props => evt => {
      evt.preventDefault();
      const { oAuth, setOAuth, setActiveTabIndex } = props;
      setActiveTabIndex(evt.detail.activeTabIndex);
      setOAuth(!oAuth);
    },
    handleChange: props => (evt, value) => {
      evt.preventDefault();
      props.setValue(value);
    },
    handleChangeIndex: props => (evt, index) => {
      console.log("evt => ", evt);
      console.log("index => ", index);
      // evt.preventDefault();
      props.setValue(index);
    }
  })
);

const SignInHeader = enhance(props => {
  const { value, theme, classes, handleChange, handleChangeIndex } = props;
  console.log(classes);
  return (
    <div className={classes.SignInHeader}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          // textColor="#ff4081"
          inkBarStyle={{
            background: "#ff4081"
          }}
          fullWidth
        >
          <Tab label="Social Sign In" />
          <Tab label="ShallEat Sign In" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          <OAuthSignIn {...props} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <LocalSignIn {...props} />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
});

SignInHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default SignInHeader;
