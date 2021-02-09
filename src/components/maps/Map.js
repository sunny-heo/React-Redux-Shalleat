import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_API, CUSTOM_MAP_OPTIONS } from "../../_config/myMapConfig";

import IconButton from "@material-ui/core/IconButton";
import NearMe from "@material-ui/icons/NearMe";

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
    },
    handleOnZoomChange: radius => {
      const scale = radius / 500;
      return +(16 - Math.log(scale) / Math.log(2));
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
      <div
        className="google-map shadow-sm bg-white rounded"
        style={{ width: "100%" }}
      >
        <div className="h-100" style={{ position: "relative" }}>
          <IconButton
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              zIndex: 15
            }}
            onClick={centeredMyLocation}
          >
            <NearMe style={{ color: "#424242" }} />
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
                <div lat={lat} lng={lng} key={r.place_id}>
                  <RestaurantMarker
                    restaurant={r}
                    index={i}
                    handleRestaurantClick={handleRestaurantClick}
                  />
                </div>
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
);

export default Map;
