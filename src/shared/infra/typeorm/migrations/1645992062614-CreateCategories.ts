import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1645992062614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
      }),
    );
  }

  // Faz o inverso do método "up"
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
