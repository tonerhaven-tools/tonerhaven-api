const express = require("express");
const app = express();
const cors = require("cors");

const server_port = 3001;
const brands_routes = require("./controllers/brands_controller");
const products_routes = require("./controllers/products_controller");
const serverless = require("serverless-http");

//Swagger definitions
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

/*** ROUTES > Controllers ***/
app.use("/api/brands", brands_routes);
app.use("/api/products", products_routes);

// Serve files inside storage
app.use("/api/storage", express.static(`${__dirname}/storage`));

/** Node Server Log **/
app.listen(server_port, () => {
  console.log(`App started on port ${server_port}`);
});

module.exports.handler = serverless(app);
