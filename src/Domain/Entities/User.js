class User {
  constructor(id, nomeCompleto, cpfCnpj, email, senha, tipoUsuario) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.cpfCnpj = cpfCnpj; //Recebe ou cpf ou Cpnj
    this.email = email;
    this.senha = senha;
    this.tipoUsuario = tipoUsuario;
  }

  getId() {
    return this.id;
  }
  getNome() {
    return this.nomeCompleto;
  }
  getCpfCpnj() {
    return this.cpfCnpj;
  }
  getEmail() {
    return this.email;
  }
  getSenha() {
    return this.senha;
  }
  getTipoUsuario() {
    return this.tipoUsuario;
  }
}

module.exports = User;
