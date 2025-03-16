import { body, param } from "express-validator";
import { number, text } from '#middlewares/validations/utils/custom.js';
import checkValidationResult from './utils/checkValidationResult.js';

export default function validate(method) {
  switch(method) {
    case "crear": {
      return [
        text("nombre"),
        body("tipo", "Falta el tipo de sensor").exists().isString().trim().notEmpty().isIn(["SENSOR", "ACTUADOR"]),
        checkValidationResult
      ]
    }

    case "editar": {
      return [
        param("sensorId", "Falta el id de sensor").exists().isString().trim().notEmpty(),
        text("nombre", { optional: true }),
        checkValidationResult
      ]
    }

    case "enviar": {
      return [
        param("sensorId", "Falta el id de sensor").exists().isString().trim().notEmpty(),
        body("dato", "Debes enviar datos").exists(),
        checkValidationResult
      ]
    }
  }
}