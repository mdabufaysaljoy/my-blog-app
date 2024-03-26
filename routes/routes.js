const authRoutes = require("./authRoute");
const dashboardRoutes = require("./dashboardRoute");
const playgroundRoutes = require('../playground/play')
const routes = [
  {
    path: "/auth",
    handler: authRoutes,
  },
  {
    path: "/dashboard",
    handler: dashboardRoutes,
  },
  {
    path: "/playground",
    handler: playgroundRoutes,
  },
  {
    path: "/",
    handler: (req, res) => {
      res.render("pages/home/index.ejs", {
        title: "home page",
        flashMessage: {},
      });
    },
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
