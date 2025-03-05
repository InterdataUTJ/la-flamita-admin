import Venta from "#models/Venta.js";
import { VentaShowError } from "#middlewares/error.middleware.js";


export default async function mostrar(req, res, next) {
    try {
        const idventa = req.params.ventaId;
        const venta = await Venta.findById(idventa);
        if (!venta) {
            throw (new VentaShowError("Venta no encontrada"));
        }
        res.json(venta);
    } catch (error) {
        return next(new VentaShowError(error.message));
    }
}

