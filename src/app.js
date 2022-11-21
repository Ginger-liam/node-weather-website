const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { send } = require("process");
const e = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//  Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//  Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//  Setup static dir to serve
app.use(express.static(publicDirPath));

const name = "Liam Willis";

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "You are not going to get any help EVER!",
    title: "Help",
    name,
  });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "you need search term",
//     });
//   }
//   console.log(req.query);
//   res.send({
//     products: [],
//   });
// });

app.get("/weather", ({ query } = {}, res) => {
  if (!query.address) {
    return res.send({
      error: "No address provided",
    });
  }

  geocode(query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        location,
        forecast: forecastData,
        address: query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name,
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found",
    name,
    title: "404 Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
