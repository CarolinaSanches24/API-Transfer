const express = require("express");
const router = express.Router();
const TransferenciaService = require("../../Application/services/TransferenciaService");

router.post("/transferencias", async (req, res) => {
  const { remetente_id, destinatario_id, valor } = req.body;

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
    } else if (error.message === "Usuário destinatario não encontrado") {
      res.status(404).json({ mensagem: "Usuário destinatário não encontrado" });
    } else if (error.message === "Somente revendedores podem enviar dinheiro") {
      res
        .status(400)
        .json({ mensagem: "Somente revendedores podem enviar dinheiro" });
    } else if (error.message === "saldo insuficiente") {
      res.status(400).json({ mensagem: "saldo insuficiente" });
    } else {
      console.error("Erro ao realizar transferência:", error);
      res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }
});

module.exports = router;
