import userService from "../_requests/userService";

const userObj = {
  email: "sunny@gmail.com",
  password: "superSecret1@"
};
export const fetchUser = () => async dispatch => {
  dispatch({ type: "FETCH_USER_PENDING" });

  try {
    const user = await userService.signIn(userObj);
    dispatch({ type: "FETCH_USER_FULFILLED", payload: user });
  } catch (error) {
    dispatch({ type: "FETCH_USER_REJECTED", payload: error });
  }
};
