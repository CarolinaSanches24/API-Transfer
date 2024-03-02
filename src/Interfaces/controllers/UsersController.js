const express = require("express");
const router = express.Router();
const UserService = require("../../Application/services/UserService");
const UserRepository = require("../../Infrastructure/repositories/UserRepository");

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

//path => http://127.0.0.1:3000/api/users

router.post("/users", async (req, res) => {
  const userData = req.body;

  try {
    const registeredUser = await userService.addUser(userData);
    res.status(201).json({ registeredUser });
  } catch (error) {
    if (error.message === "CPF ou CNPJ já cadastrado.") {
      res.status(400).json({ mensagem: "CPF ou CNPJ já cadastrado." });
    } else if (error.message === "O e-mail já está cadastrado.") {
      res.status(400).json({ mensagem: "O e-mail já está cadastrado." });
    } else {
      console.log(error.message);
      res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }
});

//path => http://127.0.0.1:3000/api/users/1
router.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { valor_deposito } = req.body;

  try {
    // depositar dinheiro

    const updatedUser = await userService.updateSaldoUsuario(
      userId,
      valor_deposito
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error("Erro ao atualizar o saldo do usuário:", error.message);
    console.log("aqui");
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

module.exports = router;
