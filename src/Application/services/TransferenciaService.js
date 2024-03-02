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

module.exports = TransferenciaService;
