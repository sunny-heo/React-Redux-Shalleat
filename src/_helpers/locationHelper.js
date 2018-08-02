const options = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 0
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), { name: "PositionError", code })
        ),
      options
    );
  });
};

export const parseCurrentLocation = async () => {
  try {
    const { coords: position } = await getCurrentLocation();
    const { latitude: lat, longitude: lng } = position;
    const currentLocation = { lat, lng };
    return currentLocation;
  } catch (e) {
    if (e.name === "PositionError") {
      console.log(e.message + ". code = " + e.code);
    }
  }
};
