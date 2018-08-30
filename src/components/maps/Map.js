import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withState, withHandlers } from "recompose";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_API, CUSTOM_MAP_OPTIONS } from "../../_config/myMapConfig";

import IconButton from "@material-ui/core/IconButton";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import UserLocationMarker from "./UserLocationMarker";
import RestaurantMarker from "./RestaurantMarker";

const mapStateToProps = (state, nextOwnProps) => state.user;

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({
    centeredMyLocation: ({ setCenter, location }) => evt => {
      evt.preventDefault();
      setCenter(location);
    },
    handleMapOnChange: ({ setCenter }) => ({ center }) => {
      setCenter(center);
    }
  })
);
const Map = enhance(
  ({
    restaurants,
    location,
    center,
    centeredMyLocation,
    handleMapOnChange,
    handleRestaurantClick
  }) => {
    return (
      <div className="GoogleMap mb-8" style={{ height: "100%", width: "100%" }}>
        <IconButton
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            zIndex: 15
          }}
          onClick={centeredMyLocation}
        >
          <MyLocationIcon style={{ color: "#424242" }} />
        </IconButton>

        <GoogleMapReact
          bootstrapURLKeys={GOOGLE_MAP_API}
          defaultCenter={location}
          center={center}
          zoom={11}
          options={CUSTOM_MAP_OPTIONS}
          layerTypes={["TrafficLayer", "TransitLayer"]}
          onChange={handleMapOnChange}
        >
          <UserLocationMarker lat={location.lat} lng={location.lng} />
          {restaurants.map((r, i) => {
            const { lat, lng } = r.geometry.location;
            return (
              <RestaurantMarker
                lat={lat}
                lng={lng}
                key={r.place_id}
                restaurant={r}
                index={i}
                handleRestaurantClick={handleRestaurantClick}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
);

export default Map;
