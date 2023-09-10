const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");

//Swagger definitions
const swaggerUi = require("swagger-ui-express");
const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();
const swaggerDocument = require("./swaggerdoc/swagger.json");

const app = express();
const server_port = 3001;
const server_host = "127.0.0.1";

const brands_routes = require("./controllers/brands_controller");
const products_routes = require("./controllers/products_controller");
const profile_routes = require("./controllers/profiles_controller");
const acct_checks_routes = require("./controllers/acctchecks_controller");
const dashboard_routes = require("./controllers/dashboard_controller");

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES > Controllers
app.use("/api/brands", brands_routes);
app.use("/api/products", products_routes);
app.use("/api/profiles", profile_routes);
app.use("/api/check", acct_checks_routes);
app.use("/api/dashboard", dashboard_routes);

// Serve files inside storage
app.use("/storage", express.static(require("path").join(__dirname, "storage")));

// swagger docs
app.use(express.static(pathToSwaggerUi));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Node Server Log

const server = app.listen(server_port, server_host, () => {
  const host = server.address().address;
  const port = server.address().port;
  const baseUrl = `http://${host}:${port}`;
  const swagger = `http://${host}:${port}/swagger`;
  console.log(`Server is listening at ${baseUrl}`);
  console.log(`API Docs at ${swagger}`);
});

module.exports.handler = serverless(app);
