import React from "react";
import { compose, withState } from "recompose";

const enhance = compose();
const MapPage = enhance(props => {
  return <h1>This is map page </h1>;
});

export default MapPage;
