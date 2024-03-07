const express = require("express");
const router = express.Router();
const AuthService = require("../../../Application/services/auth/AuthService");
const UserRepository = require("../../../Infrastructure/repositories/users/UserRepository");

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const token = await authService.authenticateUser(email, senha);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ mensagem: error.message });
  }
});

module.exports = router;
