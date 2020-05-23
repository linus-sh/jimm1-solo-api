//import api
const { setupServer } = require("./src/server");
const express = require("express");

//activate server
const server = setupServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//ルートディレクトリを指定
server.use(express.static("./src"));
