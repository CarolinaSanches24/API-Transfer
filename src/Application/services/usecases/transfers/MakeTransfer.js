const UserRepository = require("../../../../Infrastructure/repositories/users/UserRepository");
const TransferRepository = require("../../../../Infrastructure/repositories/transfers/TransferRepository");
const Transf = require("../../../../Domain/Entities/transfers/transfer");

class MakeTransfer {
  constructor(userRepository, transferRepository) {
    this.userRepository = new UserRepository();
    this.transferRepository = new TransferRepository();
  }

  async executeTransfer(senderId, receiverId, transferValue) {
    const findSender = await this.userRepository.searchUserById(senderId);
    const findReceiver = await this.userRepository.searchUserById(receiverId);

    try {
      if (!findSender || !findReceiver) {
        throw new Error("Usuário não encontrado");
      }

      if (findSender.tipo_usuario === "lojista") {
        throw new Error("Somente revendedores podem enviar dinheiro");
      }
      console.log(findSender.saldo);

      if (findSender.saldo < transferValue) {
        throw new Error("Saldo insuficiente para transferência.");
      }

      // Atualizar os saldos no banco de dados
      await this.userRepository.updateUserBalance(
        senderId,
        findSender.saldo - transferValue
      );
      await this.userRepository.updateUserBalance(
        receiverId,
        findReceiver.saldo + transferValue
      );

      // Registro da transferência
      const dateTransfer = new Date().toLocaleDateString("pt-BR");

      await this.transferRepository.saveTransfer(
        senderId,
        receiverId,
        transferValue,
        dateTransfer
      );

      return "Transferência realizada com sucesso!";
    } catch (error) {
      // Reverter a transação em caso de erro
      throw error;
    }
  }
}

module.exports = MakeTransfer;
