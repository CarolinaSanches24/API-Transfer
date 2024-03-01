require("dotenv").config();

const express = require("express");
const cors = require("cors");
const server = express();
const userController = require("./Interfaces/controllers/UsersController");

server.use(cors());
server.use(express.json());
server.use("/api", userController);

const porta = process.env.PORT;
server.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
