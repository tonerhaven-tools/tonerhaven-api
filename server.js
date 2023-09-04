const express = require("express");
const app = express();

const server_port = 3001;
const user_routes = require("./controllers/user_controller");

//Environment Variables
const serverless = require("serverless-http");

//Swagger definitions
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Controllers / routes
app.use("/api/users", user_routes);

/*** ROUTES ***/

app.get("/api", (request, response) => {
  response.json("You've reached Express backend.");
});

/** Node Server Log **/
app.listen(server_port, () => {
  console.log(`App started`);
});

module.exports.handler = serverless(app);
