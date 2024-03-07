const request = require("supertest");

const baseUrl = "http://localhost:3000";

describe("Verificar se os endpoints estão retornando o esperado", () => {
  it("Deve cadastrar um novo usuario", async () => {
    await request(baseUrl)
      .post(`/api/users`)
      .send({
        nomeCompleto: "João gomes",
        cpfCnpj: "455.445.888-94",
        email: "joao@email.com",
        senha: "1234ss",
        tipoUsuario: "lojista",
      })
      .expect(201);
  });
});
