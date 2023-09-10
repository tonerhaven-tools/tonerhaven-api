const path = require("path");
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Toner Haven API",
    description: "Web service for tonerhaven api",
  },
  host: "127.0.0.1:3001",
  schemes: ["http"],
};

const outputFile = "./swagger/swagger.json";
const endpointsFiles = ["./server.js"];

const swaggergen = swaggerAutogen(outputFile, endpointsFiles, doc);

module.exports = swaggergen;
