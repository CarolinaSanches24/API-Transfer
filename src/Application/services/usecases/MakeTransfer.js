const UsuarioRepository = require("../../Infrastructure/repositories/UsuarioRepository");
const TransferenciaRepository = require("../../Infrastructure/repositories/TransferenciaRepository");

class RealizarTransferencia {
  constructor(usuarioRepository, transferenciaRepository) {
    this.usuarioRepository = usuarioRepository;
    this.transferenciaRepository = transferenciaRepository;
  }

  async executarTransferencia(remetenteId, destinatarioId, valor) {
    try {
      // Verificar se o remetente possui saldo suficiente
      const remetente = await this.usuarioRepository.buscarUsuarioPorId(
        remetenteId
      );
      if (!remetente || remetente.getSaldo() < valor) {
        throw new Error("Remetente inválido ou saldo insuficiente");
      }

      // Deduzir o valor do saldo do remetente
      remetente.deduzirSaldo(valor);
      await this.usuarioRepository.atualizarUsuario(remetente);

      // Adicionar o valor ao saldo do destinatário
      const destinatario = await this.usuarioRepository.buscarUsuarioPorId(
        destinatarioId
      );
      destinatario.adicionarSaldo(valor);
      await this.usuarioRepository.atualizarUsuario(destinatario);

      // Registrar a transferência
      const dataHora = new Date(); // Data e hora atual
      const transferencia = new Transferencia(
        null,
        remetenteId,
        destinatarioId,
        valor,
        dataHora
      );
      await this.transferenciaRepository.salvarTransferencia(transferencia);

      return transferencia; // Retorna a transferência realizada
    } catch (error) {
      throw new Error(`Erro ao realizar a transferência: ${error.message}`);
    }
  }
}

module.exports = RealizarTransferencia;
