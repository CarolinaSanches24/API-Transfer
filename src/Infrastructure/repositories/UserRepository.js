// metodos para buscar, criar, atualizar e excluir usuários no banco de dados.
const knex = require("../database/connection");
const { hash } = require("bcrypt");
//Cadastrar usuario
class UserRepository {
  addUser = async (user) => {
    try {
      const [registeredUser] = await knex("usuarios")
        .insert({
          nome_completo: user.getNome(),
          cpf_cnpj: user.getCpfCpnj(),
          email: user.getEmail(),
          senha: user.getSenha(),
          tipo_usuario: user.getTipoUsuario(),
        })
        .returning("id");
      return registeredUser;
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = UserRepository;
