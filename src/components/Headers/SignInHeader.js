import React from "react";
import { compose, withHandlers, withState } from "recompose";
import { withStyles, withTheme } from "@material-ui/core/styles";

import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContainer from "./TabContainer";
import LocalSignIn from "../authentications/LocalSignIn";
import OAuthSignIn from "../authentications/OAuthSignIn";

const styles = theme => ({
  SignInHeader: {
    width: "450px",
    maxWidth: "100%",
    height: "448px",
    minHeight: "390px",
    background: "linear-gradient(to right, #5433ff, #20bdff)",
    borderRadius: 2
  },
  appBar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  }
});

const enhance = compose(
  withTheme(),
  withStyles(styles),
  withState("index", "setIndex", 0),

  withHandlers({
    handleOnChange: props => evt => {
      evt.preventDefault();
      props.setActiveTabIndex(evt.detail.activeTabIndex);
    },
    handleChange: props => (evt, index) => {
      evt.preventDefault();
      props.setIndex(index);
    },
    handleChangeIndex: props => index => {
      props.setIndex(index);
    }
  })
);

const SignInHeader = enhance(props => {
  const {
    index,
    theme,
    classes,
    handleChange,
    handleChangeIndex,
    ...restProps
  } = props;
  return (
    <div className={classes.SignInHeader}>
      <AppBar className={classes.appBar} position="static">
        <Tabs
          value={index}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="Social" />
          <Tab label="ShallEat" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={index}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          <OAuthSignIn {...restProps} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <LocalSignIn {...restProps} />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
});

export default SignInHeader;
