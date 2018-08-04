import React from "react";
import { compose, withState, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const styles = theme => {
  return {
    authButton: {
      border: "1px solid black",
      backgroundColor: "transparent",
      color: "black",
      borderRadius: 2,
      marginLeft: 8,
      marginRight: 8
    }
  };
};
const mouseEnterStyle = {
  color: "white",
  background: "#ff4081",
  border: "1px solid transparent",
  boxShadow:
    "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
};

const enhance = compose(
  withStyles(styles),
  withState("style", "setStyle", {}),
  withHandlers({
    handleMouseEnter: props => evt => {
      evt.preventDefault();
      const { style, setStyle } = props;
      setStyle({
        ...style,
        ...mouseEnterStyle
      });
    },
    handleMouseLeave: props => evt => {
      evt.preventDefault();
      const { style, setStyle } = props;
      setStyle({
        ...style,
        color: "black",
        background: "none",
        border: "1px solid black",
        boxShadow: "none"
      });
    }
  })
);
const Btn = enhance(props => {
  const {
    style,
    classes,
    currentPath,
    handleNavigateTo,
    handleMouseEnter,
    handleMouseLeave
  } = props;
  return (
    <Button
      style={currentPath ? { ...style, ...mouseEnterStyle } : style}
      className={classes.authButton}
      onClick={handleNavigateTo}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.name}
    </Button>
  );
});

export default Btn;
