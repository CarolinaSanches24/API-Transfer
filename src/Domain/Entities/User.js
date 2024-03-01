const knex = require("../../Infrastructure/database/connection");
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

  async validateCpfCnpjUnique() {
    const cpfCnpjExist = await knex("usuarios")
      .where("cpf_cnpj", this.getCpfCpnj())
      .first();
    return !!cpfCnpjExist; // Retorna true se o cpf ou cnpj já existir, false caso contrário
  }

  async validateEmailUnique() {
    const emailExist = await knex("usuarios")
      .where("email", this.getEmail())
      .first();
    return !!emailExist;
  }
}

module.exports = User;
