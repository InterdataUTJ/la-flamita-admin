import path from 'node:path';
import fs from "node:fs/promises";
import print from '#util/print/index.js';

export async function save(destination, buffer) {
  try {
    const dirname = path.dirname(destination);
    const filename = path.basename(destination);
    const absolutePath = path.join(process.cwd(), 'storage', dirname);
    const newFilePath = path.join(absolutePath, filename);

    await fs.mkdir(absolutePath, { recursive: true });
    await fs.writeFile(newFilePath, buffer);
    return asset(path.join("/storage/", dirname.replace("public", ""), filename));
  } catch (error) {
    print.error(error.message);
    throw new Error('Error al guardar el archivo');
  }
}

export function asset(filepath) {
  if (!filepath) return null;
  const appUrl = process.env.APP_URL.replace("{{PORT}}", process.env.PORT);
  if (filepath.startsWith('/')) return `${appUrl}${filepath}`;
  else return `${appUrl}/${filepath}`; 
}