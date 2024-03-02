class Transf {
  constructor(id, remetente_id, destinatario_id, valor) {
    this.id = id;
    this.remetente_id = remetente_id;
    this.destinatario_id = destinatario_id;
    this.dataTransferencia = new Date();
    this.valor = valor;
  }

  getId() {
    return this.id;
  }

  getDataTransferencia() {
    return this.dataTransferencia;
  }
  getRemententeId() {
    return this.numeroContaRemetente;
  }
  getDestinatarioId() {
    return this.numeroContaDestinatario;
  }
  getValor() {
    return this.valor;
  }
}

module.exports = Transf;
