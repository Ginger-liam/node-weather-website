const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ2luZ2VyLWxpYW0iLCJhIjoiY2xhaHl5MTBhMWFzcjNycHF0dzExNHRjMiJ9.Jk1mTad7zdOLUOA4eh9Syg&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search");
    } else {
      // const {center, place_} = response.body.features[0];

      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
