import userReqeust from "../_request/userReqeust";

export const fetchUser = () => async dispatch => {
  dispatch({ type: "FETCH_USER_PENDING" });

  try {
    const user = await userReqeust.signIn();
    dispatch({ type: "FETCH_USER_FULFILLED", payload: user });
  } catch (error) {
    dispatch({ type: "FETCH_USER_REJECTED", payload: error });
  }
};
