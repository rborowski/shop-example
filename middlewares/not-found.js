function notFoundHandler(req,res,next) {
  res.status(404).render("shared/404")
}

module.exports = notFoundHandler