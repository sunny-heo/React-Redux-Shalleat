import React from "react";
import { connect } from "react-redux";
import { compose, withState, lifecycle, withHandlers } from "recompose";
import { setItemOpen } from "../../actions/restaurantAction";

import Map from "../maps/Map";
import RestaurantsList from "../maps/RestaurantsList";

const openDetail = (openedItem, dispatch, currentIndex) => {
  const { openedIndex, opened } = openedItem;
  if (opened && openedIndex !== currentIndex) {
    dispatch(setItemOpen(currentIndex, opened));
  } else {
    dispatch(setItemOpen(currentIndex, !opened));
  }
};

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
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
    handleRestaurantClick: ({ restaurants, setCenter, dispatch }) => (
      currentIndex,
      location
    ) => evt => {
      evt.preventDefault();
      openDetail(restaurants.openedItem, dispatch, currentIndex);
      setCenter(location);
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
    <div
      className="MainPage d-flex flex-column justify-content-center m-3"
      style={{ height: "89.5vh" }}
    >
      {/* <div className="input-container d-flex align-items-center">
        <div className="RadiusBar-container w-75"><RadiusBar /></div>
        <div
          className="SearchBar-container w-25 ml-3"
          style={{ marginBottom: "19px" }}
        >
        </div>
      </div> */}

      <div className="map-review-wrapper d-flex h-100">
        <div
          className="GoogleMap-container w-75 mt-2 shadow-sm bg-white rounded"
          style={{ position: "relative" }}
        >
          <Map
            center={center}
            setCenter={setCenter}
            restaurants={_restaurants}
            handleRestaurantClick={handleRestaurantClick}
          />
        </div>
        <div className="RestList-container w-25 ml-3 mt-2">
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
