import React from "react";
import { connect } from "react-redux";
import { compose, withState, lifecycle } from "recompose";
import { getRestaurants } from "../../actions/restaurantAction";

import Map from "../maps/Map";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      // console.log(this.props.user.location);
      this.props.dispatch(getRestaurants());
    }
  })
);
const MapPage = enhance(props => {
  console.log(props);
  return (
    // <div>
    //   <h1>This is map page </h1>;
    //   <button
    //     onClick={() => {
    //       props.dispatch(getRestaurants());
    //     }}
    //   >
    //     button
    //   </button>
    //   <Map />
    // </div>
    <div
      className="MainPage d-flex flex-column justify-content-center mb-4 mt-2 ml-4 mr-3"
      style={{ height: "91vh" }}
    >
      <div className="input-container d-flex align-items-center">
        <div className="RadiusBar-container w-75">{/* <RadiusBar /> */}</div>

        <div
          className="SearchBar-container w-25 ml-3"
          style={{ marginBottom: "19px" }}
        >
          {/* <SerachBar /> */}
        </div>
      </div>
      <div className="map-review-wrapper d-flex h-100">
        <div
          className="GoogleMap-container w-75 mt-2 shadow-sm bg-white rounded"
          style={{ position: "relative" }}
        >
          <Map />
        </div>
        <div className="RestList-container w-25 ml-3 mt-2">
          {/* <RestList /> */}
        </div>
      </div>
    </div>
  );
});

export default MapPage;
