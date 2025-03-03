import Categoria from "#models/Categoria.js";
import { CategoriaDeleteError } from "#middlewares/error.middleware.js";

export default async function eliminar(req, res, next) {
  try {
    // Buscar empleado por id
    const categoria = await Categoria.findByIdAndDelete(req.params.categoriaId);
    if (!categoria) {
      return next(new CategoriaDeleteError("Categoria no encontrada"));
    }

    return res.status(204).end();

  } catch (error) {
    return next(new CategoriaDeleteError(error.message));
  }
};