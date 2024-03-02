const UsuarioRepository = require("../../Infrastructure/repositories/UserRepository");
const TransferenciaRepository = require("../../Infrastructure/repositories/TrasferenciaRepository");

class TransferenciaService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
    this.transferenciaRepository = new TransferenciaRepository();
  }

  async realizarTransferencia(remetenteId, destinatarioId, valor) {
    try {
      // Verificar se o usuário do remetente existe
      const remetente = await this.usuarioRepository.buscarUsuarioPorId(
        remetenteId
      );
      if (!remetente) {
        throw new Error("Usuário remetente não encontrado");
      }

      // Verificar se o usuário do destinatário existe
      const destinatario = await this.usuarioRepository.buscarUsuarioPorId(
        destinatarioId
      );
      if (!destinatario) {
        throw new Error("Usuário destinatário não encontrado");
      }
    } catch (error) {
      throw error; // Lançar o erro para ser tratado no controlador
    }
  }
}

module.exports = TransferenciaService;
