import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose, withState, withHandlers, lifecycle } from "recompose";

import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import BatteryFullIcon from "@material-ui/icons/BatteryFullRounded";
import BatteryChargingIcon from "@material-ui/icons/BatteryCharging50Rounded";
import PhoneIcon from "@material-ui/icons/LocalPhoneRounded";
import LocationIcon from "@material-ui/icons/LocationOnRounded";

import red from "@material-ui/core/colors/red";

import { getRestaurantDetails } from "../../actions/restaurantAction";

import {
  _array,
  _getTodayHours,
  _calcRemainingTime,
  _repeat
} from "../../_helpers";

const styles = theme => ({
  detailContainer: {},
  listContainer: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    "text-align": "center"
  },
  avatar: {
    // margin: 10,
    color: "#fff",
    backgroundColor: "#ff4081"
  },
  address: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  }
});

const placeSearchURL = placeId =>
  `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`;

// const mapStateToProps = (state, nextOwnProps) => state.restaurants;
// const mapDispatchToProps = dispatch => {
//   return {
//     getDetails: async placeId => {
//       try {
//         await dispatch(getRestaurantDetails(placeId));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
// };

const DEFAULT_MESSAGE = "Not available";

const enhance = compose(
  withStyles(styles)
  // connect(
  //   mapStateToProps,
  //   mapDispatchToProps
  // ),
  // withState("remainingTime", "setRemainingTime", ""),
  // withState("timerId", "setTimerId", null),
  // withState("prevPlaceId", "setPrevPlaceId", null),
  // withHandlers({
  //   handleRemainingTime: props => async () => {
  //     const { schedule, setRemainingTime, setTimerId } = props;
  //     const businessHours = _getTodayHours(schedule);
  //     const edgeCases = ["Not available", "Open 24 hours"];
  //     if (edgeCases.includes(businessHours)) {
  //       setRemainingTime(businessHours);
  //     } else {
  //       try {
  //         const timerId = await _repeat(
  //           () => setRemainingTime(_calcRemainingTime(businessHours)),
  //           1000
  //         );
  //         await setTimerId(timerId);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  // }),
  // lifecycle({
  //   componentDidMount() {
  //     this.props.setPrevPlaceId();
  //     this.props.handleRemainingTime();
  //   },
  //   componentDidUpdate(prevProps) {
  //     if (this.props.placeId !== prevProps.openedItem.openedPlaceId) {
  //       clearInterval(this.props.timerId);
  //       this.props.handleRemainingTime();
  //     }
  //   },
  //   componentWillUnmount() {
  //     clearInterval(this.props.timerId);
  //   }
  // })
);

const DetailListItem = enhance(props => {
  const { classes, _in, component: Component, primary } = props;
  // const {
  //   formatted_phone_number: phone = DEFAULT_MESSAGE,
  //   international_phone_number: intPhone = DEFAULT_MESSAGE,
  //   price_level: price = DEFAULT_MESSAGE,
  //   website = DEFAULT_MESSAGE
  // } = detail;

  return (
    <Grow
      in={_in}
      direction="right"
      unmountOnExit
      {...{
        timeout: {
          // enter: index * 50,
          // exit: index * 20
          enter: 3000,
          exit: 600
        }
      }}
    >
      <ListItem>
        <Avatar className={classes.avatar}>
          <Component />
        </Avatar>
        <ListItemText primary={primary} />
      </ListItem>
    </Grow>
  );
});

export default DetailListItem;
