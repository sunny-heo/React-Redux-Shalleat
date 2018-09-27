import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { compose, withState, withHandlers, lifecycle } from "recompose";

import Fade from "@material-ui/core/Fade";
import DetailList from "./DetailList";

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
  },
  title: {
    "text-align": "center"
  }
});

const placeSearchURL = placeId =>
  `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`;

const mapStateToProps = (state, nextOwnProps) => state.restaurants;
const mapDispatchToProps = dispatch => {
  return {};
};

const DEFAULT_MESSAGE = "Not available";

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
const RestaurantDetail = enhance(props => {
  const { classes, list, details, openedItem, detailOpened, hello } = props;
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
          <Fade
            in={detailOpened}
            direction="right"
            unmountOnExit
            {...{
              timeout: {
                // enter: index * 50,
                // exit: index * 20
                enter: 2000,
                exit: 700
              }
            }}
          >
            <h2 className={`${classes.title} my-4`}>{detail.name}</h2>
          </Fade>
          <DetailList
            placeId={openedItem.openedPlaceId}
            detail={detail}
            address={address}
            schedule={schedule}
            detailOpened={detailOpened}
          />
        </Fragment>
      ) : null}
    </div>
  );
});

export default RestaurantDetail;
