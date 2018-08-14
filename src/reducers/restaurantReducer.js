import restaurantConstants from "../_constants/restaurantConstants";

const {
  RESTAURANT_ALL_PENDING,
  RESTAURANT_ALL_REJECTED,
  RESTAURANT_ALL_FULFILLED,

  RESTAURANT_DETAILS_PENDING,
  RESTAURANT_DETAILS_REJECTED,
  RESTAURANT_DETAILS_FULFILLED,

  RESTAURANT_PHOTOS_PENDING,
  RESTAURANT_PHOTOS_REJECTED,
  RESTAURANT_PHOTOS_FULFILLED,

  SET_KEYWORD
} = restaurantConstants;

const initialState = {
  list: {},
  pendingGetRestaurants: false,
  gotRestaurants: false,
  getRestaurantsError: null,
  details: {},
  pendingGetDetails: false,
  gotdetails: false,
  getDetailsError: null,
  photos: {},
  pendingGetPhotos: false,
  gotPhotos: false,
  getPhotosError: null,
  keyword: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTAURANT_ALL_PENDING: {
      return { ...state, pendingGetRestaurants: true };
    }

    case RESTAURANT_ALL_REJECTED: {
      return {
        ...state,
        pendingGetRestaurants: false,
        getRestaurantsError: action.payload
      };
    }

    case RESTAURANT_ALL_FULFILLED: {
      return {
        ...state,
        pendingGetRestaurants: false,
        gotRestaurants: true,
        list: action.payload
      };
    }

    case RESTAURANT_DETAILS_PENDING: {
      return { ...state, pendingGetDetails: true };
    }

    case RESTAURANT_DETAILS_REJECTED: {
      return {
        ...state,
        pendingGetDetails: false,
        getDetailsError: action.payload
      };
    }

    case RESTAURANT_DETAILS_FULFILLED: {
      return {
        ...state,
        pendingGetDetails: false,
        gotdetails: true,
        details: action.payload
      };
    }

    case RESTAURANT_PHOTOS_PENDING: {
      return { ...state, pendingGetPhotos: true };
    }

    case RESTAURANT_PHOTOS_REJECTED: {
      return {
        ...state,
        pendingGetPhotos: false,
        getPhotosError: action.payload
      };
    }

    case RESTAURANT_PHOTOS_FULFILLED: {
      return {
        ...state,
        pendingGetPhotos: false,
        gotPhotos: true,
        photos: action.payload
      };
    }

    case SET_KEYWORD: {
      return {
        ...state,
        keyword: action.payload
      };
    }

    default:
      return state;
  }
};
