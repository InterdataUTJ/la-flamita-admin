import { email, text } from '#middlewares/validations/utils/custom.js';
import checkValidationResult from './utils/checkValidationResult.js';

export default function validate(method) {
  switch(method) {
    case "login": {
      return [
        email("correo"),
        text("clave", { min: 8, max: 50, articulo: "la" }),
        checkValidationResult
      ]
    }

    case "editar": {
      return [
        text("nombre", { optional: true }),
        text("apellido", { optional: true }),
        email("correo", { optional: true }),
        text("clave", { min: 8, max: 50, articulo: "la", optional: true }),
        // file("Falta el avatar").optional(),
        checkValidationResult
      ]
    }
  }
}