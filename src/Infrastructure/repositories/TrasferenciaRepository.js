const knex = require("../database/connection");

class TransferenciaRepository {
  async salvarTransferencia(
    remetenteId,
    destinatarioId,
    valor,
    dataTransferencia
  ) {
    let transaction;
    try {
      transaction = await knex.transaction();
      // Inserindo a transferência no banco de dados
      const result = await transaction("transferencias").insert({
        remetente_id: remetenteId,
        destinatario_id: destinatarioId,
        valor: valor,
        data_transferencia: dataTransferencia,
      });
    } catch (error) {
      // Reverte a transação em caso de erro

      await transaction.rollback();

      throw new Error("Erro ao salvar a transferência no banco de dados");
    }
  }
}

module.exports = TransferenciaRepository;
