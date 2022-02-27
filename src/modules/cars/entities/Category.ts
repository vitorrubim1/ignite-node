import { v4 as uuid } from 'uuid';
import { Entity } from "typeorm";

@Entity('categories')
class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  // Quando essa classe é instanciada o id é gerado automaticamente
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category }
