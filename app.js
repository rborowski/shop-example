const path = require("path");

const express = require("express");
const csrf = require("csurf");

const expressSession = require("express-session");
const createSessionConfig = require("./config/session");

const db = require("./data/database");
const addCsrfToken = require("./middlewares/csrf-token");
const errorHandler = require("./middlewares/error-handler");
const checkAuthStatus = require("./middlewares/check-auth");
const protectRoutes = require("./middlewares/protect-routes")
const cartMiddleware = require("./middlewares/cart")

const baseRoutes = require("./routes/base.routes");
const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes")

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(expressSession(createSessionConfig()));
app.use(csrf());

app.use(addCsrfToken);
app.use(checkAuthStatus);

app.use(cartMiddleware)

app.use(baseRoutes);
app.use(productsRoutes);
app.use(authRoutes);
app.use("/cart", cartRoutes)
app.use(protectRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connection failed!");
    console.log(error);
  });
