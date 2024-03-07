const express = require("express");
const router = express.Router();
const {
  TransferService,
  handleTransferenceCreationError,
} = require("../../../Application/services/transfers/TransferService");

router.post("/transfers", async (req, res) => {
  const { sender_id, receiver_id, transfer_value } = req.body;

  try {
    const transferService = new TransferService();
    await transferService.carryOutTransfer(
      sender_id,
      receiver_id,
      transfer_value
    );

    res.status(201).json({ mensagem: "Transfer completed successfully!" });
  } catch (error) {
    handleTransferenceCreationError(error, res);
  }
});

module.exports = router;
