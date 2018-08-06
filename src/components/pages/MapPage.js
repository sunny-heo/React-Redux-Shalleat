import React from "react";
import { connect } from "react-redux";
import { compose, withState, lifecycle } from "recompose";
import { getRestaurants } from "../../actions/restaurantAction";

const mapStateToProps = (state, nextOwnProps) => state.restaurantReducer;

const enhance = compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {}
  })
);
const MapPage = enhance(props => {
  console.log(props);
  return (
    <div>
      <h1>This is map page </h1>;
      <button
        onClick={() => {
          props.dispatch(getRestaurants());
        }}
      >
        button
      </button>
    </div>
  );
});

export default MapPage;
