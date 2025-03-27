import Venta from "#models/Venta.js";
import { VentaDeliverError } from "#middlewares/error.middleware.js";

export default async function entregar(req, res, next) {
  try {
    const { token } = req.body;
    if (!token) throw new VentaDeliverError("Falta el token de entrega");
    const venta = await Venta.findOne({ token });
    if (!venta) throw new VentaDeliverError("El token de entrega no es válido");
    if (venta.estado === "PENDIENTE") throw new VentaDeliverError("Esta venta no ha sido pagada");
    if (venta.estado === "COMPLETADO") throw new VentaDeliverError("La venta ya ha sido entregada");
    if (venta.estado !== "PAGADO") throw new VentaDeliverError("Hay un error con el estado de la venta");

    venta.estado = "COMPLETADO";
    await venta.save();
    res.status(204).end();
  } catch (error) {
    return next(new VentaDeliverError(error.message));
  }
}
