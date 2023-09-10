const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Toner Haven API",
    description: "Web service for tonerhaven api",
  },
  host: "localhost:3001",
  schemes: ["https", "http"],
};

const outputFile = "./swaggerdoc/swagger.json";
const endpointsFiles = [`./server.js`];

const swaggergen = swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js"); // Your project's root file
});

module.exports = swaggergen;
