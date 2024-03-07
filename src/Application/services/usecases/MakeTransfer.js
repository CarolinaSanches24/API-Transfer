const UserRepository = require("../../../Infrastructure/repositories/UserRepository");
const TransferenciaRepository = require("../../../Infrastructure/repositories/TrasferenciaRepository");
const Transf = require("../../../Domain/Entities/transfer");

class RealizarTransferencia {
  constructor(userRepository, transferenciaRepository) {
    this.userRepository = userRepository;
    this.transferenciaRepository = transferenciaRepository;
  }

  async executarTransferencia(remetenteId, destinatarioId, valor) {
    let remetente = null;
    let destinatario = null;
    try {
      remetente = await this.userRepository.buscarUsuarioPorId(remetenteId);
      destinatario = await this.userRepository.buscarUsuarioPorId(
        destinatarioId
      );

      if (!remetente) {
        throw new Error("Usuário  não encontrado");
      }

      if (!destinatario) {
        throw new Error("Usuário  não encontrado");
      }

      if (remetente.tipo_usuario === "lojista") {
        throw new Error("Somente revendedores podem enviar dinheiro");
      }

      if (remetente.saldo < valor) {
        throw new Error("Saldo insuficiente para transferência.");
      }

      // Atualizar os saldos no banco de dados
      await this.userRepository.updateSaldoUsuario(
        remetenteId,
        remetente.saldo - valor
      );
      await this.userRepository.updateSaldoUsuario(
        destinatarioId,
        destinatario.saldo + valor
      );

      // Registro da transferência
      const dataTransferencia = new Date().toLocaleDateString("pt-BR");

      await this.transferenciaRepository.salvarTransferencia(
        remetenteId,
        destinatarioId,
        valor,
        dataTransferencia
      );

      return "Transferência realizada com sucesso!";
    } catch (error) {
      // Reverter a transação em caso de erro
      if (remetente && destinatario) {
        await this.userRepository.updateSaldoUsuario(
          remetenteId,
          remetente.saldo
        );
      }

      throw error;
    }
  }
}

module.exports = RealizarTransferencia;
