import Cliente from "#models/Cliente.js";
import bcrypt from "bcryptjs";
import { ClienteCreateError } from "#middlewares/error.middleware.js";
import mime from "mime-types";
import * as storage from '#util/storage/index.js';

export default async function crear(req, res, next) {
    try {
        const { nombre, apellido, correo, clave } = req.body;

        //Creamos un nuevo cliente 
        const cliente = new Cliente();

        cliente.nombre = nombre;
        cliente.apellido = apellido;
        cliente.correo = correo;
        cliente.clave = await bcrypt.hash(clave, 10);
        cliente.avatar = storage.asset("/imagenes/avatar_default.svg");

        if (req.files && req.files[0]) {
            const nuevoNombre = `/imagenes/clientes/avatar_${cliente._id}.${mime.extension(req.files[0].mimetype)}`;
            cliente.avatar = await storage.save(nuevoNombre, req.files[0].buffer);;
        }

        //Guardamos el cliente
        await cliente.save();
        //Enviamos una respuesta con status 204
        res.status(204).end();

    } catch (error) {
        //Si ocurre un error lo manejamos con el middleware ClienteCreateError
        return next(new ClienteCreateError(error.message));
    }

}