import Cliente from "#models/Cliente.js";
import { ClienteUpdateError } from "#middlewares/error.middleware.js";
import bcrypt from "bcryptjs";
import mime from "mime-types";
import * as storage from '#util/storage/index.js';


export default async function editar(req, res, next) {
    try {
        //Tomamos los datos del body del req del cliente
        const { nombre, apellido, correo, clave } = req.body;

        //Mediante el metodo findById buscamos el cliente por su id para actualizar
        const cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente) return next(new ClienteUpdateError("Cliente no encontrado"));

        if (nombre) cliente.nombre = nombre;
        if (apellido) cliente.apellido = apellido;
        if (correo) cliente.correo = correo;
        if (clave) cliente.clave = await bcrypt.hash(clave, 10);

        // Guardar avatar
        const file = req.files.find(file => file.fieldname === 'avatar');
        if (file) {
            await storage.remove(cliente.avatar);
            const nuevoNombre = `/imagenes/clientes/avatar_${cliente._id}.${mime.extension(file.mimetype)}`;
            cliente.avatar = await storage.save(nuevoNombre, file.buffer);
        }

        //Guardamos el cliente
        await cliente.save();
        //Enviamos una respuesta con status 204 al usuario
        res.status(204).end();
    } catch (error) {
        return next(new ClienteUpdateError(error.message));
    }

}