const express = require("express");
const router = express.Router();
const TransferenciaService = require("../application/services/TransferenciaService");

router.post("/transferencias", async (req, res) => {
  const { origemId, destinoId, valor } = req.body;

  try {
    const transferenciaService = new TransferenciaService();
    await transferenciaService.realizarTransferencia(
      origemId,
      destinoId,
      valor
    );
    res.status(200).json({ mensagem: "Transferência realizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao realizar transferência:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

module.exports = router;
