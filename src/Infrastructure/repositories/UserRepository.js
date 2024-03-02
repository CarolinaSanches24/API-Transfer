// metodos para buscar, criar, atualizar e excluir usuários no banco de dados.
const knex = require("../database/connection");
const { hash } = require("bcrypt");
//Cadastrar usuario
class UserRepository {
  addUser = async (user) => {
    try {
      const passCripto = await hash(user.getSenha(), 10); //senha criptografada

      const [registeredUser] = await knex("usuarios")
        .insert({
          nome_completo: user.getNome(),
          cpf_cnpj: user.getCpfCpnj(),
          email: user.getEmail(),
          senha: passCripto,
          tipo_usuario: user.getTipoUsuario(),
        })
        .returning(["id", "nome_completo", "tipo_usuario"]);
      return registeredUser;
    } catch (error) {
      console.log(error.message);
    }
  };

  async updateSaldoUsuario(userId, novoSaldo) {
    try {
      const [updatedUser] = await knex("usuarios")
        .update({
          saldo: novoSaldo,
        })
        .where("id", userId)
        .returning(["id", "nome_completo", "tipo_usuario", "saldo"]);

      return updatedUser;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  findByEmail = async (email) => {
    try {
      const user = await knex("usuarios").where("email", email).first();
      return user;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  async buscarUsuarioPorId(userId) {
    try {
      const user = await knex("usuarios").where("id", userId).first();
      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
    }
  }
}

module.exports = UserRepository;
