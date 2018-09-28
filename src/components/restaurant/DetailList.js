import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose, withState, withHandlers, lifecycle } from "recompose";

import { Grow, List, ListItem, ListItemText, Avatar } from "@material-ui/core";
import {
  BatteryFullRounded as BatteryFullIcon,
  BatteryCharging50Rounded as BatteryChargingIcon,
  LocalPhoneRounded as PhoneIcon,
  LocationOnRounded as LocationIcon,
  HomeRounded as HomeIcon
} from "@material-ui/icons";

import DetailListItem from "./DetailListItem";

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
  withState("prevPlaceId", "setPrevPlaceId", null),
  withHandlers({
    handleRemainingTime: props => async () => {
      const { schedule, setRemainingTime, setTimerId } = props;
      const businessHours = _getTodayHours(schedule);
      const edgeCases = ["Not available", "Open 24 hours"];
      if (edgeCases.includes(businessHours)) {
        setRemainingTime(businessHours);
      } else {
        try {
          const timerId = await _repeat(
            () => setRemainingTime(_calcRemainingTime(businessHours)),
            1000
          );
          await setTimerId(timerId);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.setPrevPlaceId();
      this.props.handleRemainingTime();
    },
    componentDidUpdate(prevProps) {
      if (this.props.placeId !== prevProps.openedItem.openedPlaceId) {
        clearInterval(this.props.timerId);
        this.props.handleRemainingTime();
      }
    },
    componentWillUnmount() {
      clearInterval(this.props.timerId);
    }
  })
);

const DetailList = enhance(props => {
  const {
    classes,
    detail,
    address,
    schedule,
    placeId,
    remainingTime,
    detailOpened
  } = props;
  const {
    formatted_phone_number: phone = DEFAULT_MESSAGE,
    international_phone_number: intPhone = DEFAULT_MESSAGE,
    price_level: price = DEFAULT_MESSAGE,
    website = DEFAULT_MESSAGE
  } = detail;

  const { isOpenNow } = schedule || {};
  return (
    <div className={classes.listContainer}>
      <List>
        {/* <DetailListItem
          _in={detailOpened}
          primary={remainingTime}
          Component={
            isOpenNow ? (
              <BatteryFullIcon className={classes.iconHover} />
            ) : (
              <BatteryChargingIcon className={classes.iconHover} />
            )
          }
        /> */}
        <Grow
          in={props.detailOpened}
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
              {isOpenNow ? (
                <BatteryFullIcon className={classes.iconHover} />
              ) : (
                <BatteryChargingIcon className={classes.iconHover} />
              )}
            </Avatar>
            <ListItemText primary={remainingTime} />
          </ListItem>
        </Grow>
        <Grow
          in={props.detailOpened}
          direction="right"
          unmountOnExit
          {...{
            timeout: {
              // enter: index * 50,
              // exit: index * 20
              enter: 3000,
              exit: 500
            }
          }}
        >
          <ListItem>
            <Avatar className={classes.avatar}>
              <PhoneIcon className={classes.iconHover} />
            </Avatar>
            <ListItemText
              primary={
                <a href={`tel:${intPhone}`}>
                  <span>{phone}</span>
                </a>
              }
            />
          </ListItem>
        </Grow>
        <Grow
          in={props.detailOpened}
          direction="right"
          unmountOnExit
          {...{
            timeout: {
              // enter: index * 50,
              // exit: index * 20
              enter: 3500,
              exit: 400
            }
          }}
        >
          <ListItem>
            <Avatar className={classes.avatar}>
              <LocationIcon className={classes.iconHover} />
            </Avatar>
            <ListItemText
              primary={
                address === DEFAULT_MESSAGE ? (
                  <span>{address}</span>
                ) : (
                  <a className={classes.address} href={placeSearchURL(placeId)}>
                    <span>{address}</span>
                  </a>
                )
              }
            />
          </ListItem>
        </Grow>
        <Grow
          in={props.detailOpened}
          direction="right"
          unmountOnExit
          {...{
            timeout: {
              // enter: index * 50,
              // exit: index * 20
              enter: 4000,
              exit: 300
            }
          }}
        >
          <ListItem>
            <Avatar className={classes.avatar}>
              <HomeIcon className={classes.iconHover} />
            </Avatar>
            <ListItemText
              primary={
                website === DEFAULT_MESSAGE ? (
                  <span>{website}</span>
                ) : (
                  <a className={classes.address} href={website}>
                    <span>{website}</span>
                  </a>
                )
              }
            />
          </ListItem>
        </Grow>
      </List>
    </div>
  );
});

export default DetailList;
