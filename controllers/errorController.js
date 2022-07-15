exports.serve404Page = (req, res, next) => {
  res.status(404).render("404", {path: "/pagenotfound", pageTitle: "Page not found", mainCss: true });
}