const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async authenticateUser(email, senha) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não autorizado!");
    }

    const corretPass = await compare(senha, user.senha);

    if (!corretPass) {
      throw new Error("Usuário não autorizado!");
    }

    const passJWT = process.env.SENHA_JWT;
    //Gerando o token de autenticacao
    const token = jwt.sign({ userId: user.id }, passJWT, {
      expiresIn: "12h",
    });
    return { token, usuarioId: user.id };
  }
}

module.exports = AuthService;
