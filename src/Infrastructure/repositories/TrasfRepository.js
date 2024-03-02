const knex = require("../database/connection");

class TransferenciaRepository {
  async salvarTransferencia(transferencia) {
    try {
      // Inserir a transferência no banco de dados
      const [id] = await knex("transferencias").insert({
        remetente_id: transferencia.getRemetenteId(),
        destinatario_id: transferencia.getDestinatarioId(),
        valor: transferencia.getValor(),
        data_hora: transferencia.getDataHora(),
      });

      return id; // Retorna o ID da transferência salva
    } catch (error) {
      throw new Error("Erro ao salvar a transferência no banco de dados");
    }
  }
}

module.exports = TransferenciaRepository;
