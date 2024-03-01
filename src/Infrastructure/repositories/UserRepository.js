// metodos para buscar, criar, atualizar e excluir usuários no banco de dados.
const knex = require("../database/connection");
//Cadastrar usuario

const addUser = async (user) => {
  try {
    const [userId] = await knex("usuarios").insert({
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      senha: user.senha,
    });
  } catch (error) {
    throw error;
  }
};
