import React from "react";
import { connect } from "react-redux";
import { compose, withState, lifecycle } from "recompose";
import { getRestaurants } from "../../actions/restaurantAction";

import Map from "../maps/Map";
import RestaurantsList from "../maps/RestaurantsList";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      const { user, dispatch } = this.props;
      const currentLocation = user.location;
      const radius = 1500;
      // dispatch(getRestaurants({ ...currentLocation, radius }));
    }
  })
);
const MapPage = enhance(props => {
  console.log(props);
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
          {gotRestaurants ? <RestaurantsList /> : null}
        </div>
      </div>
    </div>
  );
});

export default MapPage;
