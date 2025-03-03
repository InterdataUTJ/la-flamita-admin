import { CategoriaCreateError } from "#middlewares/error.middleware.js";
import Categoria from "#models/Categoria.js";

export default async function (req, res, next) {
  try {
    const { valores, nombre, descripcion } = req.body;

    const categoria = new Categoria();
    categoria.nombre = nombre;
    categoria.descripcion = descripcion;
    
    valores.forEach((nombre) => {
      categoria.datos.push({ nombre });
    });
    
    await categoria.save();
    res.status(204).end();
  } catch (error) {
    return next(new CategoriaCreateError(error.message));
  }
};