import { parse } from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
};

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);

      // Varredura no arquivo
      parseFile.on("data", async (line) => {
        const [name, description] = line;

        categories.push({ name, description });
      })
        .on("end", () => {
          fs.promises.unlink(file.path); // Dps do arquivo ser lido, remove-o
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(category => {
      const alreadyExistCategory =
        this.categoriesRepository.findByName(category.name);

      if (!alreadyExistCategory) {
        this.categoriesRepository.create(category);
      }
    });
  }
};

export { ImportCategoryUseCase };
