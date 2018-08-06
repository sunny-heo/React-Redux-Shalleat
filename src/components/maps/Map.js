import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_API, CUSTOM_MAP_OPTIONS } from "../../_config/myMapConfig";

// import createMapOptions from "../../helper/customGoogleMap";

// const restaurantMarkers = cProps => {
//   const { filteredRests, loading } = cProps;
//   return filteredRests().map((restaurant, i) => {
//     const { place_id: placeId, geometry } = restaurant;
//     const { lat, lng } = geometry.location;
//     return loading ? null : (
//       <RestProvider key={`marker-${placeId}`} lat={lat} lng={lng}>
//         <RestaurantMarker
//           placeId={placeId}
//           location={{ lat, lng }}
//           index={i}
//           restaurant={restaurant}
//           {...cProps}
//         />
//       </RestProvider>
//     );
//   });
// };
const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(connect(mapStateToProps));
const Map = enhance(props => {
  const { user, restaurants } = props;
  console.log(user.location);
  return (
    <div className="GoogleMap mb-8" style={{ height: "100%", width: "100%" }}>
      {/* <div
        className="currentLocator mt-3 mr-3 btn d-flex justify-content-center"
        style={{
          position: "absolute",
          minWidth: "25px",
          top: "0px",
          right: "0px",
          zIndex: 15,
          cursor: "pointer",
          padding: "10px 5px"
        }}
        onClick={e => {
          e.preventDefault();
          // setPopover(null, false);
          // setCenter(currentLocation);
        }}
      >
        <i className="material-icons">my_location</i>
      </div> */}
      <GoogleMapReact
        bootstrapURLKeys={GOOGLE_MAP_API}
        defaultCenter={user.location}
        // center={center}
        zoom={11}
        options={CUSTOM_MAP_OPTIONS}
        layerTypes={["TrafficLayer", "TransitLayer"]}
        // onChange={({ center, zoom }) => setCenter(center)}
      >
        {/* <CurrentMarker
              lat={currentLocation.lat}
              lng={currentLocation.lng}
              text={user.firstName}
              {...mcProps}
              style={{ border: "solid 5px black" }}
            />
            {restaurantMarkers({ ...mcProps })} */}
      </GoogleMapReact>
    </div>
  );
});

export default Map;
