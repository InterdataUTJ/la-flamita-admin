import Venta from '#models/Venta.js';
import Producto from '#models/Producto.js';
import { VentaCreateError } from '#middlewares/error.middleware.js';
import mongoose from 'mongoose';

export default async function crear(req, res,next) {

    const empleado_id = req.user._id;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        //La venta queda vacia
        const venta = new Venta();
        venta.empleado_id = empleado_id;
        venta.fecha_venta = new Date();
        venta.fecha_pago = new Date();
        venta.estado = 'COMPLETADO';
        venta.metodo_pago = 'EFECTIVO';
        await venta.save({ session });

        for (const [producto_id, cantidad] of Object.entries(req.body.productos)) {
            const producto = await Producto.findById(producto_id);
            if (!producto) {
                throw VentaCreateError(`Producto con id ${producto_id} no encontrado`);
            }
            if (producto.cantidad < cantidad) {
                throw VentaCreateError(`Producto con id ${producto_id} no tiene suficiente stock`);
            }
            await Producto.findByIdAndUpdate(producto_id, { cantidad: producto.cantidad - cantidad }, { session });
            await Venta.findByIdAndUpdate(venta._id, {
                $push: {
                    productos: {
                        producto_id: producto_id,
                        cantidad: cantidad,
                        precio: producto.precio,
                        descuento: producto.descuento
                    }
                }
            }, { session });
        }

        await session.commitTransaction();
        session.endSession();
        res.status(204).end();
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        return next ( new VentaCreateError(error.message));
    }
}