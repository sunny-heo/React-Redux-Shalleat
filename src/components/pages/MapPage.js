import React from "react";
import { connect } from "react-redux";
import { compose, withState, lifecycle, withHandlers } from "recompose";
import { getRestaurants } from "../../actions/restaurantAction";

import Map from "../maps/Map";
import RestaurantsList from "../maps/RestaurantsList";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  withState("_restaurants", "_setRestaurants", []),
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
        const filteredRestaurants = restaurantsClone.filter(
          r =>
            r.name.toLowerCase().includes(searchKeyword) ||
            r.vicinity.toLowerCase().includes(searchKeyword)
        );
        _setRestaurants(filteredRestaurants);
      }, 200);
      setTimerId(timerId);
    }
  })
);

const MapPage = enhance(props => {
  const { list: restaurants, gotRestaurants } = props.restaurants;
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
          <Map />
        </div>
        <div className="RestList-container w-25 ml-3 mt-2">
          {/* {gotRestaurants ? <RestaurantsList {...props} /> : null} */}
          <RestaurantsList {...props} />
        </div>
      </div>
    </div>
  );
});

export default MapPage;
