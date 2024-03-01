const knex = require("knex")({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

knex
  .raw("SELECT 1")
  .then(() => {
    console.log("Conexao com o banco de dados estabelecida com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

module.exports = knex;
