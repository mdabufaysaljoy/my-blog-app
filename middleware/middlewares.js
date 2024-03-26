const express = require("express");
const flash = require("connect-flash");
const morgan = require("morgan");
const session = require("express-session");
const config = require("config");
const setLocals = require("./setLocals");
const MongoDBStore = require("connect-mongodb-session")(session);
const { bindUserWithRequest } = require("./authMiddleware");
const MONGODB_URI = `mongodb+srv://${config
  .get("db-user")
  .toLowerCase()}:${config
  .get("db-password")
  .toLowerCase()}@users.wit5elw.mongodb.net/AFJ-BLOG`;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "mySessions",
  expires: 100 * 60 * 60 * 2,
});
const middlewares = [
  morgan('dev'),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: config.get("secret") || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  flash(),
  bindUserWithRequest(),
  setLocals(),
];
module.exports = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
