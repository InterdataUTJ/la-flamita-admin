import Venta from "#models/Venta.js";
import { VentaListError } from "#middlewares/error.middleware.js";

export default async function listar(_, res, next) {
    try {
        const ventas = await Venta.listar();
        if (!ventas) {
            throw (new VentaListError("Ventas no encontradas"));
        }
        res.json(ventas);
    } catch (error) {
        return next(new VentaListError(error.message));
    }
}