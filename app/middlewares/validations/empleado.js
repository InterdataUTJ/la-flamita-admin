import { body, param } from "express-validator";
import { file } from '#middlewares/validations/utils/file.js';
import checkValidationResult from './utils/checkValidationResult.js';

export default function validate(method) {
  switch(method) {
    case "crear": {
      return [
        body("nombre", "Falta el nombre").exists(),
        body("apellido", "Falta el apellido").exists(),
        body("correo", "Falta el correo").exists().isEmail(),
        body("clave", "Falta la clave").exists(),
        body("rol", "Falta el rol").exists().isIn(['ADMINISTRADOR', 'GERENTE', 'EMPLEADO']),
        file("Falta el avatar"),
        checkValidationResult
      ]
    }

    case "editar": {
      return [
        param("empleadoId", "Falta el id de empleado").exists(),
        body("nombre", "Falta el nombre").optional(),
        body("apellido", "Falta el apellido").optional(),
        body("correo", "Falta el correo").optional().isEmail(),
        body("clave", "Falta la clave").optional(),
        body("rol", "Falta el rol").optional().isIn(['ADMINISTRADOR', 'GERENTE', 'EMPLEADO']),
        checkValidationResult
      ]
    }
  }
}