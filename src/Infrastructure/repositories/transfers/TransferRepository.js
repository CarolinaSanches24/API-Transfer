const knex = require("../../database/connection");

class TransferRepository {
  async saveTransfer(sendId, receiverId, transferValue, dateTransfer) {
    let transaction;
    try {
      transaction = await knex.transaction();
      // Inserindo a transferência no banco de dados
      const result = await transaction("transferencias").insert({
        remetente_id: sendId,
        destinatario_id: receiverId,
        valor: transferValue,
        data_transferencia: dateTransfer,
      });
    } catch (error) {
      // Reverte a transação em caso de erro
      await transaction.rollback();
      throw new Error("Erro ao salvar a transferência no banco de dados");
    }
  }
}

module.exports = TransferRepository;
