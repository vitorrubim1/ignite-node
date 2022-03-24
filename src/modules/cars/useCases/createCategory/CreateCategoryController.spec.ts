import { Connection } from "typeorm";
import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";

let connection: Connection;

// Teste de integração
describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations(); // rodando migrations

    const id = uuid();
    const password = await hash("admin", 8);

    // Adicionando usuário administrador
    await connection.query(
      `
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@appcar.com', '${password}', true, 'now()', '123abc456')
    `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@appcar.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category name supertest",
        description: "Description supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with same name exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@appcar.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category name supertest",
        description: "Description supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
