//Importamos el modelo de cliente 
import Cliente from '#models/Cliente.js';
import { ClienteListError } from '#middlewares/error.middleware.js';


//Una funcion asincrona que recibe un objeto res para posdteriro mente enviar una respuesta
export default async function listar(req, res, next){
    try{
        //Hacemos uso de el metodo estatico listar del modelo Cliente
        const clients = await Cliente.listar();
        //Enviamos la respuesta en formato json
        res.json(clients);
    }catch (error){
        return next(new ClienteListError(error.message));
    } 
}

