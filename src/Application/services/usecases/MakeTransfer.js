const UserRepository = require("../../../Infrastructure/repositories/UserRepository");
const TransferenciaRepository = require("../../../Infrastructure/repositories/TrasferenciaRepository");
const Transf = require("../../../Domain/Entities/transfer");

class RealizarTransferencia {
  constructor(userRepository, transferenciaRepository) {
    this.userRepository = userRepository;
    this.transferenciaRepository = transferenciaRepository;
  }

  async executarTransferencia(remetenteId, destinatarioId, valor) {
    try {
      const remetente = await this.userRepository.buscarUsuarioPorId(
        remetenteId
      );
      const destinatario = await this.userRepository.buscarUsuarioPorId(
        destinatarioId
      );

      //verificar se o remetente  e o destinario existem
      if (!remetente) {
        throw new Error("Usuário remetente não encontrado");
      }

      if (!destinatario) {
        throw new Error("Usuário destinatario não encontrado");
      }

      // Verificar o tipo de usuario
      if (remetente.tipo_usuario === "lojista") {
        throw new Error("Somente revendedores podem enviar dinheiro");
      }

      // Verificar se o remetente possui saldo suficiente

      if (remetente.saldo < valor) {
        throw new Error("saldo insuficiente");
      }

      remetente.saldo -= valor;
      destinatario.saldo += valor;

      // Atualizar os saldos no banco de dados
      await this.userRepository.updateSaldoUsuario(
        remetenteId,
        remetente.saldo
      );
      await this.userRepository.updateSaldoUsuario(
        destinatarioId,
        destinatario.saldo
      );

      const dataTransferencia = new Date().toLocaleDateString("pt-BR");

      await this.transferenciaRepository.salvarTransferencia(
        remetenteId,
        destinatarioId,
        valor,
        dataTransferencia
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RealizarTransferencia;
