class Transf {
  constructor(id, numeroContaRemetente, numeroContaDestinatario, tipoUsuario) {
    this.id = id;
    this.numeroContaRemetente = numeroContaRemetente;
    this.numeroContaDestinatario = numeroContaDestinatario;
    this.dataTransferencia = new Date();
    this.tipoUsuario = tipoUsuario;
  }

  getId() {
    return this.id;
  }

  getDataTransferencia() {
    return this.dataTransferencia;
  }
  getNumeroContaRementente() {
    return this.numeroContaRemetente;
  }
  getNumeroContaDestinatario() {
    return this.numeroContaDestinatario;
  }
}
