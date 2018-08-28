import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withState, withHandlers } from "recompose";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_API, CUSTOM_MAP_OPTIONS } from "../../_config/myMapConfig";

import IconButton from "@material-ui/core/IconButton";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import RestaurantMarker from "./RestaurantMarker";

const mapStateToProps = (state, nextOwnProps) => state.user;

const enhance = compose(
  connect(mapStateToProps),
  withState("center", "setCenter", null),
  lifecycle({
    componentDidMount() {
      console.log(this.props);
      const { location, setCenter } = this.props;
      setCenter(location);
    }
  }),
  withHandlers({
    centeredMyLocation: props => evt => {
      evt.preventDefault();
      const { setCenter, location } = props;
      setCenter(location);
    },
    handleCenterOnChange: props => mapAttr => {
      const { setCenter } = props;
      const { center } = mapAttr;
      setCenter(center);
    }
  })
);
const Map = enhance(props => {
  const {
    user,
    restaurants,
    location,
    center,
    centeredMyLocation,
    handleCenterOnChange,
    handleRestaurantClick
  } = props;
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
        <MyLocationIcon style={{ color: "#212121" }} />
      </IconButton>

      <GoogleMapReact
        bootstrapURLKeys={GOOGLE_MAP_API}
        defaultCenter={location}
        center={center}
        zoom={11}
        options={CUSTOM_MAP_OPTIONS}
        layerTypes={["TrafficLayer", "TransitLayer"]}
        onChange={handleCenterOnChange}
      >
        {/* <CurrentMarker
              lat={currentLocation.lat}
              lng={currentLocation.lng}
              text={user.firstName}
              {...mcProps}
              style={{ border: "solid 5px black" }}
            />
            {restaurantMarkers({ ...mcProps })} */}
        {/* <div lat={location.lat} lng={location.lng}>
          <IconButton

          // onClick={centeredMyLocation}
          >
            <RestaurantIcon style={{ color: "#212121" }} />
          </IconButton>
        </div> */}
        {/* <RestaurantMarker location={location} /> */}
        {restaurants.map((r, i) => {
          const { lat, lng } = r.geometry.location;
          return (
            <RestaurantMarker
              lat={lat}
              lng={lng}
              key={r.id}
              rest={r}
              index={i}
              handleRestaurantClick={handleRestaurantClick}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
});

export default Map;
