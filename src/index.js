require("dotenv").config();

const express = require("express");
const cors = require("cors");
const server = express();
const userController = require("./Interfaces/controllers/UsersController");
const authController = require("./Interfaces/controllers/AuthController");
const transferController = require("./Interfaces/controllers/TrasferenciaController");

server.use(cors());
server.use(express.json());
server.use("/api", userController);
server.use("/api", authController);
server.use("/api", transferController);

const porta = process.env.PORT;
server.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
