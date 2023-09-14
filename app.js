const path = require("path");

const express = require("express");
const csrf = require("csurf");

const expressSession = require("express-session");
const createSessionConfig = require("./config/session")

const db = require("./data/database");
const addCsrfToken = require("./middlewares/csrf-token");
const errorHandler = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(expressSession(createSessionConfig()))
app.use(csrf());

app.use(addCsrfToken);

app.use(authRoutes);

app.use(errorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connection failed!");
    console.log(error);
  });
