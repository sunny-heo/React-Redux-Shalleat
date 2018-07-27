import userConstants from "../_constants/userConstants";
import userService from "../_requests/userService";

const {
  SIGNIN_USER_PENDING,
  SIGNIN_USER_REJECTED,
  SIGNIN_USER_FULFILLED,
  SIGNUP_USER_PENDING,
  SIGNUP_USER_REJECTED,
  SIGNUP_USER_FULFILLED,
  SIGNOUT_USER_PENDING,
  SIGNOUT_USER_REJECTED,
  SIGNOUT_USER_FULFILLED
} = userConstants;

// const userObj = {
//   email: "sunny@gmail.com",
//   password: "superSecret1@"
// };

export const signInUser = userInput => async dispatch => {
  dispatch({ type: SIGNIN_USER_PENDING });

  try {
    const user = await userService.signIn(userInput);
    dispatch({ type: SIGNIN_USER_FULFILLED, payload: user });
  } catch (error) {
    dispatch({ type: SIGNIN_USER_REJECTED, payload: error });
  }
};

export const signUpUser = userInput => async dispatch => {
  dispatch({ type: SIGNUP_USER_PENDING });

  try {
    const user = await userService.signUp(userInput);
    dispatch({ type: SIGNUP_USER_FULFILLED, payload: user });
  } catch (error) {
    dispatch({ type: SIGNUP_USER_REJECTED, payload: error });
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
