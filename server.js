process.env.TZ = 'America/New_York';
const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");

//Swagger definitions
const swaggerUi = require("swagger-ui-express");

const app = express();
const server_port = 3001;
const server_host = "127.0.0.1";

const brands_routes = require("./controllers/brands_controller");
const products_routes = require("./controllers/products_controller");
const profile_routes = require("./controllers/profiles_controller");
const acct_checks_routes = require("./controllers/acctchecks_controller");
const dashboard_routes = require("./controllers/dashboard_controller");
const shipping_routes = require("./controllers/shipping_controller");

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES > Controllers
app.use("/api/brands", brands_routes);
app.use("/api/products", products_routes);
app.use("/api/profiles", profile_routes);
app.use("/api/check", acct_checks_routes);
app.use("/api/dashboard", dashboard_routes);
app.use("/api/shipping", shipping_routes);

// Serve files inside storage
app.use("/storage", express.static(require("path").join(__dirname, "storage")));
app.use(
  "/storage/uploads/products",
  express.static(
    require("path").join(__dirname, "storage", "uploads", "products")
  )
);

var options = {
  swaggerOptions: {
    url: "/swagger/swagger.json",
    requestInterceptor: function (request) {
      request.headers.Origin = `http://localhost:3001`;
      return request;
    },
  },
};

// swagger docs
app.use(
  "/swagger",
  swaggerUi.serveFiles(null, options),
  swaggerUi.setup(null, options)
);

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
