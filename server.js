const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");

//Swagger definitions
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const server_port = 3001;
const brands_routes = require("./controllers/brands_controller");
const products_routes = require("./controllers/products_controller");
const profile_routes = require("./controllers/profiles_controller");
const acct_checks_routes = require("./controllers/acctchecks_controller");
const dashboard_routes = require("./controllers/dashboard_controller");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ROUTES > Controllers
app.use("/api/brands",    brands_routes);
app.use("/api/products",  products_routes);
app.use("/api/profiles",  profile_routes);
app.use("/api/check",     acct_checks_routes);
app.use("/api/dashboard", dashboard_routes);

// Serve files inside storage
app.use("/storage", express.static(require("path").join(__dirname, "storage")));

// Node Server Log
app.listen(server_port, () => {
  console.log(`App started on port ${server_port}`);
});

module.exports.handler = serverless(app);
