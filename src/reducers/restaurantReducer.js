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
  RESTAURANT_PHOTOS_FULFILLED
} = restaurantConstants;

const initialState = {
  restaurants: {},
  pendingGetRestaurants: false,
  gotRestaurants: false,
  getRestaurantsError: null,
  restaurantDetails: {},
  pendingGetRestaurantDetails: false,
  gotRestaurantDetails: false,
  getRestaurantDetailsError: null,
  restaurantPhotos: {},
  pendingGetRestaurantPhotos: false,
  gotRestaurantPhotos: false,
  getRestaurantPhotosError: null
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
        restaurants: action.payload
      };
    }

    case RESTAURANT_DETAILS_PENDING: {
      return { ...state, pendingGetRestaurantDetails: true };
    }

    case RESTAURANT_DETAILS_REJECTED: {
      return {
        ...state,
        pendingGetRestaurantDetails: false,
        getRestaurantDetailsError: action.payload
      };
    }

    case RESTAURANT_DETAILS_FULFILLED: {
      return {
        ...state,
        pendingGetRestaurantDetails: false,
        gotRestaurantDetails: true,
        restaurantDetails: action.payload
      };
    }

    case RESTAURANT_PHOTOS_PENDING: {
      return { ...state, pendingGetRestaurantPhotos: true };
    }

    case RESTAURANT_PHOTOS_REJECTED: {
      return {
        ...state,
        pendingGetRestaurantPhotos: false,
        getRestaurantPhotosError: action.payload
      };
    }

    case RESTAURANT_PHOTOS_FULFILLED: {
      return {
        ...state,
        pendingGetRestaurantPhotos: false,
        gotRestaurantPhotos: true,
        restaurantPhotos: action.payload
      };
    }

    default:
      return state;
  }
};
