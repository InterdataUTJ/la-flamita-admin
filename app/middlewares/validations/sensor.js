import { body, param } from "express-validator";
import { number, text } from '#middlewares/validations/utils/custom.js';
import checkValidationResult from './utils/checkValidationResult.js';

export default function validate(method) {
  switch(method) {
    case "crear": {
      return [
        text("nombre"),
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
        body("dato", "Debes enviar datos").exists().isString().trim().notEmpty(),
        checkValidationResult
      ]
    }
  }
}