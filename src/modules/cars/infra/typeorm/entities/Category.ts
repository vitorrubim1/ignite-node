import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  // Quando essa classe é instanciada o id é gerado automaticamente
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
