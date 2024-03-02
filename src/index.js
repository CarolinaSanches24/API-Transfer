require("dotenv").config();

const express = require("express");
const cors = require("cors");
const server = express();
const userController = require("./Interfaces/controllers/UsersController");
const authController = require("./Interfaces/controllers/AuthController");

server.use(cors());
server.use(express.json());
server.use("/api", userController);
server.use("/api", authController);

const porta = process.env.PORT;
server.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
