import { body, param } from "express-validator";
import { files } from '#middlewares/validations/utils/file.js';

export default function validate(method) {
  switch (method) {
    case "crear": {
      return [
        body("productos", "No hay productos en la venta").exists()
      ]
    }

    case "editar": {
        return [
            param("ventaId", "Falta el id del la venta").exists(),
            body("metodo_pago", "Falta el metodo de pago").exists()
        ]
    }
      
  }
}