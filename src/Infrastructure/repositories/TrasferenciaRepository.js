const knex = require("../database/connection");

class TransferenciaRepository {
  async salvarTransferencia(
    remetenteId,
    destinatarioId,
    valor,
    dataTransferencia
  ) {
    try {
      // Inserindo a transferência no banco de dados
      const result = await knex("transferencias").insert({
        remetente_id: remetenteId,
        destinatario_id: destinatarioId,
        valor: valor,
        data_transferencia: dataTransferencia,
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao salvar a transferência no banco de dados");
    }
  }
}

module.exports = TransferenciaRepository;
