const request = require("supertest");

const baseUrl = "http://localhost:3000";

describe("Verificar se os endpoints estão retornando o esperado", () => {
  const transferenceData = {
    remetente_id: 1,
    destinatario_id: 2,
    valor: 8000,
  };

  it("Deve cadastrar uma nova transferencia", async () => {
    await request(baseUrl)
      .post(`/api/transferencias`)
      .send(transferenceData)
      .expect(201);
  });

  it("Caso o usuario informe um id inexistente ", async () => {
    await request(baseUrl)
      .post(`/api/transferencias`)
      .send(transferenceData)
      .expect(404);
  });

  it("Caso o usuario informe valor maior que saldo", async () => {
    await request(baseUrl)
      .post(`/api/transferencias`)
      .send(transferenceData)
      .expect(400);
  });
});
