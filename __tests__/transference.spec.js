const request = require("supertest");

const baseUrl = "http://localhost:3000";

describe("Verificar se os endpoints estão retornando o esperado", () => {
  it("Deve cadastrar uma nova transferencia", async () => {
    await request(baseUrl)
      .post(`/api/transferencias`)
      .send({
        remetente_id: 2,
        destinatario_id: 1,
        valor: 50,
      })
      .expect(201);
  });
});
