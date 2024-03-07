const knex = require("../../../Infrastructure/database/connection");
class User {
  constructor(id, nomeCompleto, cpfCnpj, email, senha, tipoUsuario) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.cpfCnpj = cpfCnpj; //Recebe ou cpf ou Cpnj
    this.email = email;
    this.senha = senha;
    this.tipoUsuario = tipoUsuario;
    this.saldo = 0;
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
  getSaldo() {
    return this.saldo;
  }

  async validateCpfCnpjUnique() {
    const cpfCnpjExist = await knex("usuarios")
      .where("cpf_cnpj", this.getCpfCpnj())
      .first();
    return !!cpfCnpjExist;
  }

  async validateEmailUnique() {
    const emailExist = await knex("usuarios")
      .where("email", this.getEmail())
      .first();
    return !!emailExist;
  }
}

module.exports = User;
