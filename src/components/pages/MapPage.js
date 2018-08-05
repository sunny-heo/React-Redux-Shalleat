import React from "react";
import { connect } from "react-redux";
import { compose, withState } from "recompose";

const mapStateToProps = (state, nextOwnProps) => state.userReducer;

const enhance = compose(connect(mapStateToProps));
const MapPage = enhance(props => {
  return <h1>This is map page </h1>;
});

export default MapPage;
