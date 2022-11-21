const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1e3d573b3120b62ad919eff7974e9085&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    // const { error: apiError } = response.body;
    // const { weather_descriptions, temperature, feelslike } =
    // response.body.current;

    if (error) {
      callback("unable to find server");
    } else if (body.error) {
      callback("unresolved location");
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. The wind speed is " +
          body.current.wind_speed +
          " k/pm."
      );
    }
  });
};

module.exports = forecast;
