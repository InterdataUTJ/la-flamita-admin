import Producto from "#models/Producto.js";
import { ProductoDeleteError } from "#middlewares/error.middleware.js";


export default async function eliminar(req, res, next) {

    try {
        const producto = await Producto.findById(req.params.productoId);

        if (!producto) {
            return next(new ProductoDeleteError("Producto no encontrado"));
        }

        producto.estado = false;
        await producto.save();
        return res.status(204).end();

    } catch (error) {
        return next(new ProductoDeleteError(error.message));
    }


}