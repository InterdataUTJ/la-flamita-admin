import { body, param } from "express-validator";
import checkValidationResult from "./utils/checkValidationResult.js";
import { text } from "./utils/custom.js";

export default function validate(method) {
  switch (method) {
    case "crear": {
      return [
        body("productos", "No hay productos en la venta").exists().isArray({ min: 1 }),
        body("productos.*", "Los ID de productos deben de ser validos").exists().isString().trim().notEmpty(),
        checkValidationResult,
      ];
    }

    case "editar": {
      return [
        param("ventaId", "Falta el id de la venta").exists().isString().trim().notEmpty(),
        text("metodo_pago", { optional: true }),
        checkValidationResult,
      ];
    }
  }
}
