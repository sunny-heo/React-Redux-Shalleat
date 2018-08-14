import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";

import MainSearchForm from "../maps/MainSearchForm";
import AuthPending from "../pendings/AuthPending";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(connect(mapStateToProps));
const SwitchComponent = enhance(({ restaurants }) => {
  const {
    pendingGetRestaurants,
    gotRestaurants,
    getRestaurantsError
  } = restaurants;
  switch (true) {
    case pendingGetRestaurants:
      return <AuthPending />;
    case gotRestaurants:
      return <Redirect to="/map" />;
    default:
      return <MainSearchForm style={{ width: "50vw" }} />;
  }
});

const SearchPage = enhance(props => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start m-5"
      style={{ height: "90vh" }}
    >
      <h1>What shall we eat?</h1>
      <SwitchComponent />
    </div>
  );
});

export default SearchPage;
