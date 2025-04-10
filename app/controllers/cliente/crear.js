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
        cliente.avatar = storage.asset("/avatar_default.svg", false);

        // Guardar avatar
        const file = req.files.find(file => file.fieldname === 'avatar');
        if (file) {
            const nuevoNombre = `/imagenes/clientes/avatar_${cliente._id}.${mime.extension(file.mimetype)}`;
            cliente.avatar = await storage.save(nuevoNombre, file.buffer);
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