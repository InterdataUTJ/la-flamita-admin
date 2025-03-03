import path from 'node:path';
import fs from "node:fs";
import print from '#util/print/index.js';
const appUrl = process.env.APP_URL.replace("{{PORT}}", process.env.PORT);

export async function save(destination, buffer) {
  try {
    const dirname = path.dirname(destination);
    const filename = path.basename(destination);
    const absolutePath = path.join(process.cwd(), 'public/storage', dirname);
    const newFilePath = path.join(absolutePath, filename);

    await fs.promises.mkdir(absolutePath, { recursive: true });
    await fs.promises.writeFile(newFilePath, buffer);
    return asset(destination);
  } catch (error) {
    print.error(error.message);
    throw new Error('Error al guardar el archivo');
  }
}

export function asset(filepath, storage = true) {
  const storagePath = storage ? '/storage' : '';
  if (!filepath) return null;
  if (filepath.startsWith('/')) return `${appUrl}${storage}${filepath}`;
  else return `${appUrl}${storage}/${filepath}`; 
}

async function removeOne(filepath) {
  if (!filepath) return;
  const asset = filepath.replace(appUrl, '');
  if (!asset.startsWith('/storage')) return;
  const absolutePath = path.join(process.cwd(), 'public', asset);
  if (fs.existsSync(absolutePath)) await fs.promises.unlink(absolutePath);
}

export async function remove(urlArray) {
  if (!urlArray) return;
  if (typeof urlArray === "string") {
    return await removeOne(urlArray);
  }

  if (!Array.isArray(urlArray)) return;
  for (const url of urlArray) {
    await removeOne(url);
  }
}