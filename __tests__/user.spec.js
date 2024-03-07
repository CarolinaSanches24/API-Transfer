const request = require("supertest");

const baseUrl = "http://localhost:3000";

describe("Verificar se os endpoints estão retornando o esperado", () => {
  const userData = {
    nomeCompleto: "João gomes",
    cpfCnpj: "411.788.966-57",
    email: "carolinasanches@email.com",
    senha: "1231ss",
    tipoUsuario: "revendedor",
  };

  it("Deve cadastrar um novo usuario", async () => {
    await request(baseUrl).post(`/api/users`).send(userData).expect(201);
  });

  it("Caso o usuario informe um cpf ou cnpj ou email que não seja unico", async () => {
    await request(baseUrl).post(`/api/users`).send(userData).expect(400);
  });
});
