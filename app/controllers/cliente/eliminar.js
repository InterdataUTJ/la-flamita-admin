import Cliente from "#models/Cliente.js";
import { ClienteDeleteError } from "#middlewares/error.middleware.js";


export default async function eliminar(req, res, next) {
    try {

        const cliente = await Cliente.findById(req.params.clienteId);
        
        if (!cliente) {
            return next(new ClienteDeleteError("Cliente no encontrado"));
        }

        cliente.estado = false;
        await cliente.save();
        return res.status(204).end();

    } catch (error) {
        return next(new ClienteDeleteError(error.message));
    }
}