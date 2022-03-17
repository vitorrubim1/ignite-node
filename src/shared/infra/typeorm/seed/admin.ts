import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  // Adicionando usuário administrador
  await connection.query(
    `
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'vitor@appcar.com', '${password}', true, 'now()', '123abc456')
    `
  );

  await connection.close;
}

create().then(() => console.log("\n\n\n\nUser admin created 🕵️"));
