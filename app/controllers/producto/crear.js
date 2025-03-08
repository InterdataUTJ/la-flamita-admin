//Importamos el modelo de producto
import Producto from "#models/Producto.js";
import mime from "mime-types";
import * as storage from '#util/storage/index.js';
import { ProductoCreateError } from "#middlewares/error.middleware.js";


export default async function crear(req, res, next) {

    try {

        //Tomo los campos desde el body request 
        const { nombre, descripcion, precio, existencias, estado, descuento, categorias} = req.body;

        //Creo un nuevo producto request.file
        const producto = new Producto();

        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.existencias = existencias;
        producto.descuento = descuento;
        producto.estado = estado;
        producto.fotos = [];

        // req.file es un array que almacena las url de las imagenes
        const files = req.files.filter(file => file.fieldname === 'fotos');
        if (files) {
            for (const [index, file] of files.entries()){
                const nuevoNombre = `/imagenes/productos/${producto._id}.${index}.${mime.extension(file.mimetype)}`;
                const url = await storage.save(nuevoNombre, file.buffer);
                producto.fotos.push(url);
            }
        }

        producto.categorias = categorias;

        await producto.save();
        //Enviamos una respuesta con status 204
        res.status(204).end();

    }catch(error){
        return next(new ProductoCreateError(error.message));
    }
}