//setup express, app
const express = require("express");
const app = express();

//ルートディレクトリにindex.htmlを配置
app.use(express.static("./src/"));

//body-parser
app.use(express.json());

const setupServer = () => {
  app.get("/api/", (request, response) => {});

  return app;
};

module.exports = { setupServer };
