


const express    = require("express");
const app        = express();
const Database   = require("./configs/knexfile");
const UsersModel = require("./models/UsersModel");
const Auth       = require('./models/Auth');

//Environment Variables
let dotenv = require('dotenv').config();

//Swagger definitions
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*** ROUTES ***/

app.get("/api", (request, response) => {
    response.json("You've reached Express backend.");
});


app.get("/api/users", Auth, (request, response) => {
    Database('users').select().then((rows) => {
        response.json(rows);
    }).catch((error) => {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    });
});
app.post("/api/users/login", async (request, response) => {
    const users = new UsersModel(request, response);
    return await users.login();
});
app.post("/api/users/register", async (request, response) => {
    const users = new UsersModel(request, response);
    return await users.register();
});
app.post("/api/users/logout", async (request, response) => {
    const users = new UsersModel(request, response);
    return await users.logout();
});


/** Node Server Log **/
app.listen(3001, () => {
    console.log("Server is running on port http://127.0.0.1:3001");
});