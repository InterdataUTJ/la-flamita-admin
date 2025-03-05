import Venta from '#models/Venta.js';
import { VentaDeleteError, VentaUpdateError } from '#middlewares/error.middleware.js';

export default async function eliminar(req, res, next) {
    try {
        const idventa = req.params.ventaId;

        const venta = await Venta.findById(idventa);
        if (!venta) {
            throw (new VentaUpdateErrorr("Venta no encontrada"));
        }

        //Aqui eliminamos la venta 
        await Venta.findByIdAndDelete(idventa);
        res.status(204).end();

    } catch (error) {
        return next(new VentaDeleteError(error.message));
    }
}
