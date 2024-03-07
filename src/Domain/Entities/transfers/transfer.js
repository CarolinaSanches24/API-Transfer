class Transf {
  constructor(remetente_id, destinatario_id, valor) {
    this.remetente_id = remetente_id;
    this.destinatario_id = destinatario_id;
    this.dataTransferencia = new Date();
    this.valor = valor;
  }

  getDataTransferencia() {
    return this.dataTransferencia;
  }
  getRemetenteId() {
    return this.remetente_id;
  }
  getDestinatarioId() {
    return this.destinatario_id;
  }
  getValor() {
    return this.valor;
  }
}

module.exports = Transf;
