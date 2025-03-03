import { body, param } from "express-validator";

export default function validate(method) {
  switch(method) {
    case "crear": {
      return [
        body("nombre", "El nombre es invalido").exists().isLength({ min: 3, max: 50 }),
      ]
    }

    case "editar": {
      return [
        param("sensorId", "Falta el id de sensor").exists(),
        body("nombre", "El nombre es invalido").optional().isLength({ min: 3, max: 50 }),
      ]
    }

    case "enviar": {
      return [
        param("sensorId", "Falta el id de sensor").exists(),
        body("dato", "Debes enviar datos").exists(),
      ]
    }
  }
}