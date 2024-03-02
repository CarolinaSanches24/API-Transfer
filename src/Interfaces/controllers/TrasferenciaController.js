const express = require("express");
const router = express.Router();
const TransferenciaService = require("../../Application/services/TransferenciaService");

router.post("/transferencias", async (req, res) => {
  const { remetente_id, destinatario_id, valor } = req.body;
  // Log para verificar se os dados estão sendo recebidos corretamente
  console.log("Dados recebidos no corpo da solicitação:");
  console.log("origemId:", remetente_id);
  console.log("destinoId:", destinatario_id);
  console.log("valor:", valor);

  try {
    const transferenciaService = new TransferenciaService();
    await transferenciaService.realizarTransferencia(
      remetente_id,
      destinatario_id,
      valor
    );
    res.status(200).json({ mensagem: "Transferência realizada com sucesso!" });
  } catch (error) {
    if (error.message === "Usuário remetente não encontrado") {
      res.status(404).json({ mensagem: "Usuário remetente não encontrado" });
    } else if (error.message === "Usuário destinatário não encontrado") {
      res.status(404).json({ mensagem: "Usuário destinatário não encontrado" });
    } else {
      console.error("Erro ao realizar transferência:", error);
      res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }
});

module.exports = router;
