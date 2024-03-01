class User {
  constructor(id, nome, cpf, email, senha) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.cnpj = null;
    this.tipo = "";
  }

  getId() {
    return this.id;
  }
  getNome() {
    return this.nome;
  }
  getCpf() {
    return this.cpf;
  }
  getEmail() {
    return this.email;
  }
  getSenha() {
    return this.senha;
  }
  setCpnj(novoCnpj) {
    this.cnpj = novoCnpj;
  }
  setTipo(novoTipo) {
    this.tipo = novoTipo;
  }
}

module.exports = User;
