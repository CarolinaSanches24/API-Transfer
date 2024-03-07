const UserRepository = require("../../../Infrastructure/repositories/users/UserRepository");
const TransferRepository = require("../../../Infrastructure/repositories/transfers/TransferRepository");
const MakeTransfer = require("../usecases/transfers/MakeTransfer");
class TransferService {
  constructor() {
    this.userRepository = new UserRepository();
    this.transferRepository = new TransferRepository();
  }

  async carryOutTransfer(senderId, receiverId, transferValue) {
    try {
      const makeTransfer = new MakeTransfer(
        this.userRepository,
        this.transferRepository
      );

      const transferMade = await makeTransfer.executeTransfer(
        senderId,
        receiverId,
        transferValue
      );

      return transferMade;
    } catch (error) {
      throw error;
    }
  }
}

const INSUFFICIENT_FUNDS = "Saldo insuficiente para transferência.";
const ONLY_RESELLERS_SEND_MONEY = "Somente revendedores podem enviar dinheiro";
const INTERNAL_SERVER_ERROR = "Erro interno do servidor";
const USER_NOT_FOUND = "Usuário não encontrado";

function handleTransferenceCreationError(error, res) {
  switch (error.message) {
    case ONLY_RESELLERS_SEND_MONEY:
      return res.status(400).json({ mensagem: ONLY_RESELLERS_SEND_MONEY });
    case INSUFFICIENT_FUNDS:
      return res.status(400).json({ mensagem: INSUFFICIENT_FUNDS });
    case USER_NOT_FOUND:
      return res.status(404).json({ mensagem: USER_NOT_FOUND });
    default:
      console.log(error.message);
      return res.status(500).json({ mensagem: INTERNAL_SERVER_ERROR });
  }
}

module.exports = { TransferService, handleTransferenceCreationError };
