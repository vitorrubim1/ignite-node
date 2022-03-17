import fs from "fs";

export const deleteFile = async (fileName: string) => {
  try {
    // stat: Verifica se o arquivo existe
    await fs.promises.stat(fileName);
  } catch {
    return;
  }

  // Remove o arquivo
  await fs.promises.unlink(fileName);
};
