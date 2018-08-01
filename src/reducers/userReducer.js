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
  GOOGLE_SIGNIN,
  FACEBOOK_SIGNIN
} = userConstants;

const initialState = {
  user: {},
  pendingSignIn: false,
  signedIn: false,
  pendingSignUpUser: false,
  signedUp: false,
  pendingSignOut: false,
  signedOut: false,
  authType: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER_PENDING: {
      return { ...state, pendingSignIn: true };
    }

    case SIGNIN_USER_REJECTED: {
      return { ...state, pendingSignIn: false, error: action.payload };
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
      return { ...state, pendingSignUpUser: true };
    }

    case SIGNUP_USER_REJECTED: {
      return { ...state, pendingSignUpUser: false, error: action.payload };
    }

    case SIGNUP_USER_FULFILLED: {
      return {
        ...state,
        pendingSignUpUser: false,
        signedUp: true,
        user: action.payload
      };
    }

    case SIGNOUT_USER_PENDING: {
      return { ...state, pendingSignOut: true };
    }

    case SIGNOUT_USER_REJECTED: {
      return { ...state, pendingSignOut: false, error: action.payload };
    }

    case SIGNOUT_USER_FULFILLED: {
      return {
        ...state,
        pendingSignOut: false,
        signedOut: true,
        user: action.payload
      };
    }

    case GOOGLE_SIGNIN: {
      return {
        ...state,
        authType: action.payload
      };
    }

    case FACEBOOK_SIGNIN: {
      return {
        ...state,
        authType: action.payload
      };
    }

    default:
      return state;
  }
};
