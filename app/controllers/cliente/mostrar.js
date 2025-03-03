import Cliente from "#models/Cliente.js";
import { ClienteShowError } from "#middlewares/error.middleware.js";

export default async function mostrar(req, res, next) {
    try {
        const idclient = req.params.id;
        const client = await Cliente.mostrar(idclient);

        if (!client) {
            return next(new ClienteShowError("Cliente no encontrado"));
        }
        res.json(client);
    } catch (error) {
        return next(new ClienteShowError(error.message));
    }
}