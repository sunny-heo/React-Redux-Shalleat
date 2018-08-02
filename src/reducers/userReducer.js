import userConstants from "../_constants/userConstants";

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

const initialState = {
  user: {},
  pendingSignIn: false,
  signedIn: false,
  pendingSignUp: false,
  signedUp: false,
  pendingSignOut: false,
  signedOut: false,
  authError: null,
  pendingGetLocation: true,
  gotLocation: false,
  currentLocation: {},
  geoError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER_PENDING: {
      return { ...state, pendingSignIn: true };
    }

    case SIGNIN_USER_REJECTED: {
      return { ...state, pendingSignIn: false, authError: action.payload };
    }

    case SIGNIN_USER_FULFILLED: {
      return {
        ...state,
        pendingSignIn: false,
        signedIn: true,
        user: action.payload
      };
    }

    case SIGNUP_USER_PENDING: {
      return { ...state, pendingSignUp: true };
    }

    case SIGNUP_USER_REJECTED: {
      return { ...state, pendingSignUp: false, authError: action.payload };
    }

    case SIGNUP_USER_FULFILLED: {
      return {
        ...state,
        pendingSignUp: false,
        signedUp: true,
        signedIn: true,
        user: action.payload
      };
    }

    case SIGNOUT_USER_PENDING: {
      return { ...state, pendingSignOut: true };
    }

    case SIGNOUT_USER_REJECTED: {
      return { ...state, pendingSignOut: false, authError: action.payload };
    }

    case SIGNOUT_USER_FULFILLED: {
      return {
        ...state,
        pendingSignOut: false,
        signedIn: false,
        signedOut: true,
        user: action.payload
      };
    }

    case GET_USER_LOCATION_PENDING: {
      return {
        ...state,
        pendingGetLocation: true,
        gotLocation: false
      };
    }

    case GET_USER_LOCATION_REJECTED: {
      return {
        ...state,
        pendingGetLocation: false,
        gotLocation: false,
        geoError: action.payload
      };
    }

    case GET_USER_LOCATION_FULFILLED: {
      return {
        ...state,
        pendingGetLocation: false,
        gotLocation: true,
        currentLocation: action.payload
      };
    }

    default:
      return state;
  }
};
