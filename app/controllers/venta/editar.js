import Venta from '#models/Venta.js';
import { VentaUpdateError } from '#middlewares/error.middleware.js';


export default async function editar(req, res, next) {

    try{
        const idventa = req.params.ventaId;
        const {metodo_pago} = req.body;

        const venta = await Venta.findById(idventa);
        if (!venta) {
         throw (new VentaUpdateError("Venta no encontrada"));
        }

        await Venta.findByIdAndUpdate(idventa, {
            metodo_pago: metodo_pago
        });

        res.status(204).end();

    }catch(error){
        return next(new VentaUpdateError(error.message));
    }


}