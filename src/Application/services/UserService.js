//interações entre as entidades do domínio e a camada de infraestrutura
// criar, atualizar, recuperar e excluir usuários.
const User = require("../../Domain/Entities/User");

class UserService {
  //construtor para receber dados da camada de Infraestrutura
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async addUser(userData) {
    const newUser = new User(
      null,
      userData.nomeCompleto,
      userData.cpfCnpj,
      userData.email,
      userData.senha,
      userData.tipoUsuario
    );

    // Salvar o novo usuario no banco de dados
    const user = await this.userRepository.addUser(newUser);
    return user;
  }
}

module.exports = UserService;
