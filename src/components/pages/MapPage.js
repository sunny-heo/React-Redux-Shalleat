import React from "react";
import { connect } from "react-redux";
import { compose, withState, lifecycle, withHandlers } from "recompose";

import { heightAnimation, _array } from "../../_helpers";

import { setItemOpen } from "../../actions/restaurantAction";
import { getRestaurantDetails } from "../../actions/restaurantAction";

import Map from "../maps/Map";
import { RestaurantsList } from "../restaurant";

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
  }),
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
      getDetails
    }) => (currPlaceId, location) => async evt => {
      evt.preventDefault();
      const { openedItem, details } = restaurants;
      const { openedPlaceId, opened } = openedItem;
      const open = openedPlaceId === currPlaceId && opened;

      openDetail(openedItem, currPlaceId);
      setCenter(location);

      if (openedPlaceId === currPlaceId || !opened) {
        heightAnimation(!open, ".photos-container", "0%", "50%");
        heightAnimation(!open, ".google-map", "100%", "50%");
      }

      if (!details._contains("placeId", currPlaceId)) {
        await getDetails(currPlaceId);
      }
    }
  })
);

const MapPage = enhance(props => {
  const {
    center,
    setCenter,
    _restaurants,
    handleSearchOnChange,
    handleRestaurantClick
  } = props;
  const { list: restaurants } = props.restaurants;
  return (
    <div className="MainPage d-flex flex-column flex-grow-1">
      <div className="map-photos-container d-flex flex-grow-1 p-4">
        <div
          className="google-map-container w-75 mr-3"
          style={{ position: "relative" }}
        >
          <div
            className="photos-container shadow-sm bg-white rounded"
            style={{ position: "relative", height: "0%" }}
          >
            <div className="w-25 h-25 shadow-sm rounded" />
          </div>
          <Map
            center={center}
            setCenter={setCenter}
            restaurants={_restaurants}
            handleRestaurantClick={handleRestaurantClick}
          />
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
    </div>
  );
});

export default MapPage;
