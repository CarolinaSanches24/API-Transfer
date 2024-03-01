//interações entre as entidades do domínio e a camada de infraestrutura
// criar, atualizar, recuperar e excluir usuários.
const UserRepository = require("../../Infrastructure/repositories/UserRepository");

class UserService {
  //construtor para receber dados da camada de Infraestrutura
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    const newUser = new User(
      null,
      userData.nome,
      userData.cpf,
      userData.email,
      userData.senha
    );

    // Salvar o novo usuario no banco de dados
    const userId = await this.userRepository.add(newUser);
    return userId;
  }
}

module.exports = UserService;
