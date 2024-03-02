const UsuarioRepository = require("../../../Infrastructure/repositories/UserRepository");
const TransferenciaRepository = require("../../../Infrastructure/repositories/TrasferenciaRepository");

class RealizarTransferencia {
  constructor(usuarioRepository, transferenciaRepository) {
    this.usuarioRepository = usuarioRepository;
    this.transferenciaRepository = transferenciaRepository;
  }

  async executarTransferencia(remetenteId, destinatarioId, valor) {
    try {
      const remetente = await this.usuarioRepository.buscarUsuarioPorId(
        remetenteId
      );
      //verificar se o remetente existe
      if (!remetente) {
        throw new Error("Usuário remetente não encontrado");
      }
      //Verifica se o destinatario existe
      const destinatario = await this.usuarioRepository.buscarUsuarioPorId(
        destinatarioId
      );

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

      // // Deduzir o valor do saldo do remetente
      // remetente.deduzirSaldo(valor);
      // await this.usuarioRepository.atualizarUsuario(remetente);

      // Adicionar o valor ao saldo do destinatário

      destinatario.adicionarSaldo(valor);
      await this.usuarioRepository.atualizarSaldoUsuario(destinatario);

      // // Registrar a transferência
      // const dataHora = new Date(); // Data e hora atual
      // const transferencia = new Transferencia(
      //   null,
      //   remetenteId,
      //   destinatarioId,
      //   valor,
      //   dataHora
      // );
      // await this.transferenciaRepository.salvarTransferencia(transferencia);

      // return transferencia; // Retorna a transferência realizada
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RealizarTransferencia;
