import { CategoriaUpdateError } from "#middlewares/error.middleware.js";
import Categoria from "#models/Categoria.js";

export default async function editar(req, res, next) {
  try {
    const { valores, nombre, descripcion } = req.body;
    const { categoriaId } = req.params;

    const categoria = await Categoria.findById(categoriaId);
    if (!categoria) return next(new CategoriaUpdateError("La categoría no existe"));

    if (nombre) categoria.nombre = nombre;
    if (descripcion) categoria.descripcion = descripcion;

    // Agregar los valores que no existen
    const agregar = valores.filter(n => !categoria.datos.some(o => o.nombre === n));
    agregar.forEach(nombre => categoria.datos.push({ nombre }));

    // Eliminar los valores que no se enviaron
    const eliminar = categoria.datos.filter(dato => !valores.includes(dato.nombre)).map(dato => dato.nombre);
    categoria.datos = categoria.datos.filter(dato => !eliminar.includes(dato.nombre));
    
    await categoria.save();
    res.status(204).end();
  } catch (error) {
    return next(new CategoriaUpdateError(error.message));
  }
};