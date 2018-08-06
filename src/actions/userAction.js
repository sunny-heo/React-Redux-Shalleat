import userConstants from "../_constants/userConstants";
import userService from "../_requests/userService";
import { parseCurrentLocation } from "../_helpers/locationHelper";

const {
  SIGNIN_USER_PENDING,
  SIGNIN_USER_REJECTED,
  SIGNIN_USER_FULFILLED,

  SIGNUP_USER_PENDING,
  SIGNUP_USER_REJECTED,
  SIGNUP_USER_FULFILLED,

  SIGNOUT_USER_PENDING,
  SIGNOUT_USER_REJECTED,
  SIGNOUT_USER_FULFILLED,

  GET_USER_LOCATION_PENDING,
  GET_USER_LOCATION_REJECTED,
  GET_USER_LOCATION_FULFILLED
} = userConstants;

export const signUpUser = userInput => async dispatch => {
  dispatch({ type: SIGNUP_USER_PENDING });

  try {
    const user = await userService.signUp(userInput);
    dispatch({ type: SIGNUP_USER_FULFILLED, payload: user });
  } catch (error) {
    dispatch({ type: SIGNUP_USER_REJECTED, payload: error });
  }
};

export const signInUser = userInput => async dispatch => {
  dispatch({ type: SIGNIN_USER_PENDING });
  try {
    const user = await userService.signIn(userInput);
    dispatch({ type: SIGNIN_USER_FULFILLED, payload: user });
  } catch (error) {
    dispatch({ type: SIGNIN_USER_REJECTED, payload: error });
  }
};

export const googleSignInUser = accessToken => async dispatch => {
  dispatch({ type: SIGNIN_USER_PENDING });
  try {
    const user = await userService.googleSignIn(accessToken);
    dispatch({ type: SIGNIN_USER_FULFILLED, payload: user });
  } catch (error) {
    dispatch({ type: SIGNIN_USER_REJECTED, payload: error });
  }
};

export const signOutUser = () => async dispatch => {
  dispatch({ type: SIGNOUT_USER_PENDING });

  try {
    await userService.signOut();
    dispatch({ type: SIGNOUT_USER_FULFILLED, payload: {} });
  } catch (error) {
    dispatch({ type: SIGNOUT_USER_REJECTED, payload: error });
  }
};

export const getUserLocation = () => async dispatch => {
  dispatch({ type: GET_USER_LOCATION_PENDING });

  try {
    const location = await parseCurrentLocation();
    dispatch({ type: GET_USER_LOCATION_FULFILLED, payload: location });
  } catch (error) {
    dispatch({ type: GET_USER_LOCATION_REJECTED, payload: error });
  }
};
