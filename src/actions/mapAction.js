import mapConstants from "../_constants/mapConstants";

const { SET_RADIUS, SET_ZOOM } = mapConstants;

export const setRadius = radius => dispatch => {
  dispatch({ type: SET_RADIUS, payload: radius });
};

export const setZoom = radius => dispatch => {
  const scale = radius / 500;
  const zoom = +(16 - Math.log(scale) / Math.log(2));
  dispatch({ type: SET_RADIUS, payload: zoom });
};
