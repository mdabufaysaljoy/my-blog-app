require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const setMiddlewares = require("./middleware/middlewares");
const setRoutes = require("./routes/routes");

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@users.wit5elw.mongodb.net/AFJ-BLOG`;

const app = express();

// ? setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

setMiddlewares(app);
setRoutes(app);

app.use((req, res, next) => {
  let error = new Error("404 not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  if (error.status === 404) {
    res.render("pages/error/404.ejs", {
      title: "404 page not found",
      flashMessage: {},
    });
  }
  console.log(error);
  res.render("pages/error/500.ejs", {
    title: "internal server error",
    flashMessage: {},
  });
});

const PORT = process.env.PORT || 5050;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `database is connected and server is running on PORT http://localhost:${PORT}`
      );
    });
  })
  .catch((e) => {
    console.log(e);
  });
