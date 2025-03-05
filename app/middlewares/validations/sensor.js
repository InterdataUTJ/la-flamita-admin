import { body, param } from "express-validator";
import checkValidationResult from './utils/checkValidationResult.js';

export default function validate(method) {
  switch(method) {
    case "crear": {
      return [
        body("nombre", "El nombre es invalido").exists().isLength({ min: 3, max: 50 }),
        checkValidationResult
      ]
    }

    case "editar": {
      return [
        param("sensorId", "Falta el id de sensor").exists(),
        body("nombre", "El nombre es invalido").optional().isLength({ min: 3, max: 50 }),
        checkValidationResult
      ]
    }

    case "enviar": {
      return [
        param("sensorId", "Falta el id de sensor").exists(),
        body("dato", "Debes enviar datos").exists(),
        checkValidationResult
      ]
    }
  }
}