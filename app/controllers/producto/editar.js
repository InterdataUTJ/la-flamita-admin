//Importamos el modelo de producto
import Producto from "#models/Producto.js";
import mime from "mime-types";
import * as storage from '#util/storage/index.js';
import { ProductoUpdateError } from "#middlewares/error.middleware.js";

export default async function editar(req, res, next) {

    try {

        //Tomo los campos desde el body request -> body request
        const { nombre, descripcion, precio, existencias, estado, descuento, categorias } = req.body;

        //Busco el producto por el id
        const producto = await Producto.findById(req.params.productoId);
        if (!producto) return next(new ProductoUpdateError("Producto no encontrado"));

        //Asigamos los nuevos valores al producto
        if (nombre) producto.nombre = nombre;
        if (descripcion) producto.descripcion = descripcion;
        if (precio) producto.precio = precio;
        if (existencias) producto.existencias = existencias;
        if (descuento) producto.descuento = descuento;
        if (estado) producto.estado = estado;
        if (categorias) producto.categorias = categorias;

        // req.file es un array que almacena las url de las imagenes
        if (req.files && req.files.length > 0 && req.files.length <= 3) {

            //Aqui la idea es crear un metodo propio para eliminar las imagenes 
            // que ya estan del req.file y luego agregar las nuevas imagenes 
            // de esta manera no se acumulan imagenes en el servidor Y se eliminan
            // las imagenes que ya no se usan
            await storage.remove(producto.fotos);

            producto.fotos = [];
            for (const [index, file] of req.files.entries()) {
                const nuevoNombre = `/imagenes/productos/${producto._id}.${index}.${mime.extension(file.mimetype)}`;
                const url = await storage.save(nuevoNombre, file.buffer);
                producto.fotos.push(url);
            }
        }

        producto.categorias = categorias;

        await producto.save();
        //Enviamos una respuesta con status 204
        res.status(204).end();

    } catch (error) {
        return next(new ProductoUpdateError(error.message));

    }
}