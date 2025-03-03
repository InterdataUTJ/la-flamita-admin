import { body, param } from "express-validator";
import { files } from '#middlewares/validations/utils/file.js';

export default function validate(method) {
  switch (method) {
    case "crear": {
      return [
        body("nombre", "Falta el nombre").exists(),
        body("descripcion", "Falta la descripcion").exists(),
        body("precio", "Falta el precio").exists().exists(),
        body("existencias", "Falta existencias").exists(),
        files("fotos", "Faltan las fotos"),
        body("descuento", "Falta el descuento").exists(),
        body("categorias", "Falta la categoria").exists(),
      ]
    }

    case "editar": {
        return [
            param("productoId", "Falta el id del producto").exists(),
            body("nombre", "Falta el nombre").optional(),
            body("descripcion", "Falta la descripcion").optional(),
            body("precio", "Falta el precio").optional(),
            body("existencias", "Falta existencias").optional(),
            body("descuento", "Falta el descuento").optional(),
            body("categorias", "Falta la categoria").optional(),
        ]
    }
      
  }
}