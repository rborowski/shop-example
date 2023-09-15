function getHome(req, res) {
  res.redirect("/products");
}

module.exports = { getHome: getHome };
