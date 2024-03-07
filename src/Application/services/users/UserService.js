//interações entre as entidades do domínio e a camada de infraestrutura

const User = require("../../../Domain/Entities/users/User");
const UserRepository = require("../../../Infrastructure/repositories/users/UserRepository");
class UserService {
  //construtor para receber dados da camada de Infraestrutura
  constructor(userRepository) {
    this.userRepository = new UserRepository();
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
      throw error;
    }
  }

  async updateUserBalance(userId, newValue) {
    try {
      const userExist = await this.userRepository.searchUserById(userId);

      if (!userExist) {
        throw new Error("Usuário  não encontrado");
      }

      // Atualizar o saldo do usuario no banco
      const updatedUserData = await this.userRepository.updateUserBalance(
        userId,
        newValue
      );

      return updatedUserData;
    } catch (error) {
      console.error("Erro ao atualizar o saldo do  usuário:", error.message);

      throw error;
    }
  }
}

const USER_ALREADY_EXISTS = "CPF ou CNPJ já cadastrado.";
const EMAIL_ALREADY_EXISTS = "O e-mail já está cadastrado.";
const INTERNAL_SERVER_ERROR = "Erro interno do servidor";
const USER_NOT_FOUND = "Usuário  não encontrado";

function handleUserCreationError(error, res) {
  switch (error.message) {
    case USER_ALREADY_EXISTS:
      return res.status(400).json({ mensagem: USER_ALREADY_EXISTS });
    case EMAIL_ALREADY_EXISTS:
      return res.status(400).json({ mensagem: EMAIL_ALREADY_EXISTS });
    case USER_NOT_FOUND:
      return res.status(404).json({ mensagem: USER_NOT_FOUND });
    default:
      return res.status(500).json({ mensagem: INTERNAL_SERVER_ERROR });
  }
}

module.exports = { UserService, handleUserCreationError };
