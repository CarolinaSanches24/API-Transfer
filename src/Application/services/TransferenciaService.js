const UsuarioRepository = require("../../Infrastructure/repositories/UserRepository");
const TransferenciaRepository = require("../../Infrastructure/repositories/TrasferenciaRepository");
const RealizarTransferencia = require("./usecases/MakeTransfer");
class TransferenciaService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
    this.transferenciaRepository = new TransferenciaRepository();
  }

  async realizarTransferencia(remetenteId, destinatarioId, valor) {
    try {
      const realizarTransferencia = new RealizarTransferencia(
        this.usuarioRepository,
        this.transferenciaRepository
      );

      const transferenciaRealizada =
        await realizarTransferencia.executarTransferencia(
          remetenteId,
          destinatarioId,
          valor
        );

      return transferenciaRealizada;
    } catch (error) {
      throw error;
    }
  }
}

const INSUFFICIENT_FUNDS = "Saldo insuficiente para transferência.";
const ONLY_RESELLERS_SEND_MONEY = "Somente revendedores podem enviar dinheiro";
const INTERNAL_SERVER_ERROR = "Erro interno do servidor";
const USER_NOT_FOUND = "Usuário  não encontrado";

function handleTransferenceCreationError(error, res) {
  switch (error.message) {
    case ONLY_RESELLERS_SEND_MONEY:
      return res.status(400).json({ mensagem: ONLY_RESELLERS_SEND_MONEY });
    case INSUFFICIENT_FUNDS:
      return res.status(400).json({ mensagem: INSUFFICIENT_FUNDS });
    case USER_NOT_FOUND:
      return res.status(404).json({ mensagem: USER_NOT_FOUND });
    default:
      return res.status(500).json({ mensagem: INTERNAL_SERVER_ERROR });
  }
}

module.exports = { TransferenciaService, handleTransferenceCreationError };
