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
    height: "auto",
    minHeight: "390px",
    boxShadow:
      "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: 2
  },
  appBar: {
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
          indicatorColor="secondary"
          textColor="secondary"
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
