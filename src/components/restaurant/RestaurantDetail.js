import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose, withState, withHandlers, lifecycle } from "recompose";

import DetailList from "./DetailList";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import BatteryFullIcon from "@material-ui/icons/BatteryFullRounded";
import BatteryChargingIcon from "@material-ui/icons/BatteryCharging50Rounded";
import PhoneIcon from "@material-ui/icons/LocalPhoneRounded";
import LocationIcon from "@material-ui/icons/LocationOnRounded";

import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import red from "@material-ui/core/colors/red";

import { getRestaurantDetails } from "../../actions/restaurantAction";

import {
  _array,
  _getTodayHours,
  _calcRemainingTime,
  _repeat
} from "../../_helpers";

const styles = theme => ({
  detailContainer: {
    position: "relative",
    height: "0%"
  }
});

const placeSearchURL = placeId =>
  `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`;

const mapStateToProps = (state, nextOwnProps) => state.restaurants;
const mapDispatchToProps = dispatch => {
  return {
    getDetails: async placeId => {
      try {
        await dispatch(getRestaurantDetails(placeId));
      } catch (error) {
        console.log(error);
      }
    }
  };
};

const DEFAULT_MESSAGE = "Not available";

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState("remainingTime", "setRemainingTime", ""),
  withState("timerId", "setTimerId", null),
  lifecycle({
    async componentDidMount() {
      // const { details, openedItem } = this.props;
      // // if (details !== prevProps.details) {
      // const { setRemainingTime, setTimerId } = this.props;
      // const { detail, schedule } = details._find(
      //   "placeId",
      //   openedItem.openedPlaceId
      // );
      // const businessHours = _getTodayHours(schedule);
      // const edgeCases = ["Not available", "Open 24 hours"];
      // if (edgeCases.includes(businessHours)) {
      //   setRemainingTime(businessHours);
      // } else {
      //   try {
      //     const timerId = await _repeat(
      //       () => setRemainingTime(_calcRemainingTime(businessHours)),
      //       1000
      //     );
      //     await setTimerId(timerId);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      // }
    },
    async componentDidUpdate(prevProps) {
      // const { details, openedItem } = this.props;
      // if (
      //   openedItem.openedPlaceId !== prevProps.openedItem.openedPlaceId &&
      //   details.length !== 0
      // ) {
      //   const { setRemainingTime, setTimerId } = this.props;
      //   const { detail, schedule } = details._find(
      //     "placeId",
      //     openedItem.openedPlaceId
      //   );
      //   const businessHours = _getTodayHours(schedule);
      //   const edgeCases = ["Not available", "Open 24 hours"];
      //   if (edgeCases.includes(businessHours)) {
      //     setRemainingTime(businessHours);
      //   } else {
      //     try {
      //       const timerId = await _repeat(
      //         () => setRemainingTime(_calcRemainingTime(businessHours)),
      //         1000
      //       );
      //       await setTimerId(timerId);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // }
    },
    componentWillUnmount() {
      const { timerId } = this.props;
      clearInterval(timerId);
    }
  })
);
const RestaurantDetail = enhance(props => {
  const { classes, list, details, openedItem } = props;
  console.log(props);
  const { detail, schedule } = details._find(
    "placeId",
    openedItem.openedPlaceId
  );
  const { vicinity: address = DEFAULT_MESSAGE } = list._find(
    "placeId",
    openedItem.openedPlaceId
  );

  return (
    <div className="detailContainer shadow-sm bg-white rounded">
      {detail ? (
        <Fragment>
          <h1 className={classes.title}>{detail.name}</h1>
          <DetailList
            placeId={openedItem.openedPlaceId}
            detail={detail}
            address={address}
            schedule={schedule}
          />
        </Fragment>
      ) : null}
    </div>
  );
});

export default RestaurantDetail;
