//interações entre as entidades do domínio e a camada de infraestrutura
// criar, atualizar, recuperar e excluir usuários.
const User = require("../../Domain/Entities/User");

class UserService {
  //construtor para receber dados da camada de Infraestrutura
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async addUser(userData) {
    try {
      const newUser = new User(
        null,
        userData.nomeCompleto,
        userData.cpfCnpj,
        userData.email,
        userData.senha,
        userData.tipoUsuario
      );

      // Validação de CPF/CNPJ único
      const cpfCnpjExist = await newUser.validateCpfCnpjUnique();

      if (cpfCnpjExist) {
        throw new Error("CPF ou CNPJ já cadastrado.");
      }
      // Validação de Email único
      const emailExist = await newUser.validateEmailUnique();

      if (emailExist) {
        throw new Error("O e-mail já está cadastrado.");
      }

      // Salvar o novo usuario no banco de dados
      const user = await this.userRepository.addUser(newUser);
      return user;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

module.exports = UserService;
