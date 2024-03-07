const express = require("express");
const router = express.Router();
const {
  UserService,
  handleUserCreationError,
} = require("../../Application/services/UserService");
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
    handleUserCreationError(error, res);
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
    handleUserCreationError(error, res);
  }
});

module.exports = router;
