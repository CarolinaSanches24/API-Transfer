//interações entre as entidades do domínio e a camada de infraestrutura
// criar, atualizar, recuperar e excluir usuários.
const User = require("../../Domain/Entities/User");
const UserRepository = require("../../Infrastructure/repositories/UserRepository");
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

  async updateSaldoUsuario(userId, novoSaldo) {
    try {
      const userExist = await this.userRepository.buscarUsuarioPorId(userId);

      if (!userExist) {
        throw new Error("Usuário  não encontrado");
      }

      // Atualizar o saldo do usuario no banco
      const updatedUserData = await this.userRepository.updateSaldoUsuario(
        userId,
        novoSaldo
      );

      return updatedUserData;
    } catch (error) {
      console.error("Erro ao atualizar o saldo do  usuário:", error.message);

      throw error;
    }
  }
}

module.exports = UserService;
