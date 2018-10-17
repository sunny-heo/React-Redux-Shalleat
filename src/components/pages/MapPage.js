import React from "react";
import { connect } from "react-redux";
import { compose, withState, lifecycle, withHandlers } from "recompose";

import { _heightAnimation, _widthAnimation, _array } from "../../_helpers";

import { setItemOpen } from "../../actions/restaurantAction";
import { getRestaurantDetails } from "../../actions/restaurantAction";

import Map from "../maps/Map";
import { RestaurantsList, RestaurantDetail } from "../restaurant";

const mapStateToProps = (state, nextOwnProps) => state;
const mapDispatchToProps = dispatch => {
  return {
    openDetail: (openedItem, currPlaceId) => {
      const { openedPlaceId, opened } = openedItem;
      if (opened && openedPlaceId !== currPlaceId) {
        dispatch(setItemOpen(currPlaceId, opened));
      } else {
        dispatch(setItemOpen(currPlaceId, !opened));
      }
    },
    getDetails: async placeId => {
      try {
        await dispatch(getRestaurantDetails(placeId));
      } catch (error) {
        console.log(error);
      }
    }
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState("_restaurants", "_setRestaurants", []),
  withState("center", "setCenter", null),
  withState("timerId", "setTimerId", null),
  withState("detailOpened", "setDetailOpen", false),
  withState("currPlaceId", "setCurrPlaceId", null),
  withHandlers({
    handleSearchOnChange: ({
      timerId: timer,
      setTimerId,
      restaurants,
      _setRestaurants
    }) => evt => {
      evt.preventDefault();
      clearTimeout(timer);
      const searchKeyword = evt.currentTarget.value.toLowerCase();
      const timerId = setTimeout(() => {
        const [...restaurantsClone] = restaurants.list || [];
        const filteredRestaurants = restaurantsClone.map(r => {
          const _in =
            r.name.toLowerCase().includes(searchKeyword) ||
            r.vicinity.toLowerCase().includes(searchKeyword);
          return { _in, ...r };
        });
        _setRestaurants(filteredRestaurants);
      }, 200);
      setTimerId(timerId);
    },
    handleRestaurantClick: ({
      restaurants,
      setCenter,
      openDetail,
      getDetails,
      detailOpened,
      setDetailOpen,
      setCurrPlaceId
    }) => (currPlaceId, location) => async evt => {
      evt.preventDefault();
      const { openedItem, details } = restaurants;
      const { openedPlaceId, opened } = openedItem;
      const open = openedPlaceId === currPlaceId && opened;

      openDetail(openedItem, currPlaceId);
      setCenter(location);

      if (!details._contains("placeId", currPlaceId)) {
        console.log("fecthed");
        await getDetails(currPlaceId);
      }

      // await setCurrPlaceId(currPlaceId);
      setDetailOpen(!open);
      if (openedPlaceId === currPlaceId || !opened) {
        // _heightAnimation(!open, ".detailContainer", "0%", "50%");
        // _heightAnimation(!open, ".google-map", "100%", "50%");
        // _heightAnimation(!open, ".map-detail-divider", "0px", "24px");
        _widthAnimation(!open, ".detailContainer", "0%", "50%");
        _widthAnimation(!open, ".google-map", "100%", "50%");
        _widthAnimation(!open, ".map-detail-divider", "0px", "24px");
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      const { _setRestaurants, restaurants } = this.props;
      _setRestaurants([...restaurants.list]);
    },
    componentDidUpdate(prevProps) {
      const { _setRestaurants, restaurants } = this.props;
      if (this.props.restaurants.list !== prevProps.restaurants.list) {
        _setRestaurants([...restaurants.list]);
      }
    }
  })
);

const MapPage = enhance(props => {
  const {
    center,
    setCenter,
    _restaurants,
    detailOpened,
    currPlaceId,
    handleSearchOnChange,
    handleRestaurantClick
  } = props;
  const { list: restaurants, openedItem } = props.restaurants;
  const { openedPlaceId, opened } = openedItem;
  const open = openedPlaceId === currPlaceId && opened;
  console.log("openedPlaceId => ", openedPlaceId);
  console.log("currPlaceId => ", currPlaceId);
  console.log(openedPlaceId === currPlaceId);
  return (
    <div className="map-photos-container d-flex flex-grow-1 p-4">
      <div
        className="google-map-container d-flex w-75 mr-3"
        style={{ position: "relative" }}
      >
        <Map
          center={center}
          setCenter={setCenter}
          restaurants={_restaurants}
          handleRestaurantClick={handleRestaurantClick}
        />
        <div className="map-detail-divider" />
        <RestaurantDetail detailOpened={detailOpened} />
      </div>
      <div className="RestList-container w-25 ml-2 rounded">
        <RestaurantsList
          restaurants={restaurants}
          _restaurants={_restaurants}
          handleRestaurantClick={handleRestaurantClick}
          handleSearchOnChange={handleSearchOnChange}
        />
      </div>
    </div>
  );
});

export default MapPage;
