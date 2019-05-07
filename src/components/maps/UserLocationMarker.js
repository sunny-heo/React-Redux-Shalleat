import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";

const mapStateToProps = (state, nextOwnProps) => state.user;

const styles = theme => ({
  userIcon: {
    transform: "translate(-50%, -50%)",
    width: "36px",
    height: "36px"
  },
  avatar: {
    backgroundColor: "#f50057"
  }
});

const enhance = compose(
  connect(mapStateToProps),
  withStyles(styles),
  withHandlers({})
);
const UserLocationMarker = enhance(props => {
  const { classes, user } = props;

  return (
    <Fab
      color="primary"
      aria-label="Add"
      className={`${classes.userIcon} pulse`}
    >
      <Avatar className={classes.avatar}>
        {user.firstName[0].toUpperCase()}
      </Avatar>
    </Fab>
  );
});

export default UserLocationMarker;
