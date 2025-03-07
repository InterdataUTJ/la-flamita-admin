import { body, param } from "express-validator";
import { file } from '#middlewares/validations/utils/file.js';
import { text, email } from '#middlewares/validations/utils/custom.js';
import checkValidationResult from './utils/checkValidationResult.js';

export default function validate(method) {
  switch(method) {
    case "crear": {
      return [
        text("nombre"),
        text("apellido"),
        email("correo"),
        text("clave", { min: 8, max: 50, articulo: "la" }),
        body("rol", "Falta el rol").exists().isIn(['ADMINISTRADOR', 'GERENTE', 'EMPLEADO']),
        file("Falta el avatar"),
        checkValidationResult
      ]
    }

    case "editar": {
      return [
        param("empleadoId", "Falta el id de empleado").exists().isString().trim().notEmpty(),
        text("nombre", { optional: true }),
        text("apellido", { optional: true }),
        email("correo", { optional: true }),
        text("clave", { min: 8, max: 50, articulo: "la", optional: true }),
        body("rol", "Falta el rol").optional().isIn(['ADMINISTRADOR', 'GERENTE', 'EMPLEADO']),
        checkValidationResult
      ]
    }
  }
}