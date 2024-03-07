const express = require("express");
const router = express.Router();
const {
  TransferenciaService,
  handleTransferenceCreationError,
} = require("../../Application/services/TransferenciaService");

router.post("/transferencias", async (req, res) => {
  const { remetente_id, destinatario_id, valor } = req.body;

  try {
    const transferenciaService = new TransferenciaService();
    await transferenciaService.realizarTransferencia(
      remetente_id,
      destinatario_id,
      valor
    );

    res.status(201).json({ mensagem: "Transferência realizada com sucesso!" });
  } catch (error) {
    handleTransferenceCreationError(error, res);
  }
});

module.exports = router;
