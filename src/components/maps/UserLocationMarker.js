import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers, isClassComponent } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";

const mapStateToProps = (state, nextOwnProps) => state.user;

const styles = theme => ({
  userIcon: {
    // borderRadius: "2px",
    transform: "translate(-50%, -50%)",
    boxShadow:
      "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)",
    zIndex: "15"
  },
  avatar: {
    width: "48px",
    height: "48px",
    backgroundColor: "#f50057"
  }
});

const enhance = compose(
  connect(mapStateToProps),
  withStyles(styles),
  withHandlers({
    // handleItemClick: props => evt => {
    //   evt.preventDefault();
    //   openItem(props);
    // }
  })
);
const UserLocationMarker = enhance(props => {
  const { location, classes, user } = props;

  // const { opening_hours: hours = {} } = restaurant;
  // const { open_now: openNow = false } = hours;
  // const location = { lat, lng };
  // const { openedIndex, opened } = openedItem;
  // const openDetail = openedIndex === index && opened;
  return (
    <IconButton className={classes.userIcon}>
      <Avatar className={classes.avatar}>
        {user.firstName[0].toUpperCase()}
      </Avatar>
    </IconButton>
  );
});

export default UserLocationMarker;
