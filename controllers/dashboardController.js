const Flash = require('../utils/Flash');

exports.dasboardGetController = (req, res, next) => {
  res.render("pages/dashboard/dashboard.ejs", {
    title: "My dashboard",
    flashMessage: Flash.getMessage(req),
  });
};
