const express = require("express");
const router = express.Router();
const UserService = require("../../Application/services/UserService");

//path => http://127.0.0.1:3000/api/users
router.post("/users", async (req, res) => {
  const userData = req.body;
  const userService = new UserService();

  try {
    const userId = await userService.addUser(userData);
    res.status(201).json({ userId });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

module.exports = router;
