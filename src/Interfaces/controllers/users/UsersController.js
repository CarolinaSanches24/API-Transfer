const express = require("express");
const router = express.Router();
const {
  UserService,
  handleUserCreationError,
} = require("../../../Application/services/users/UserService");
const UserRepository = require("../../../Infrastructure/repositories/users/UserRepository");

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
  const { deposit_amount } = req.body;

  try {
    // depositar dinheiro
    const updatedUser = await userService.updateUserBalance(
      userId,
      deposit_amount
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    handleUserCreationError(error, res);
  }
});

module.exports = router;
