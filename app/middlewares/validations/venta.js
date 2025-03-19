import { body, param } from "express-validator";
import checkValidationResult from "./utils/checkValidationResult.js";
import { text, number } from "./utils/custom.js";

export default function validate(method) {
  switch (method) {
    case "crear": {
      return [
        body("metodo_pago", "Debes proporcionar un metodo de pago valido").exists().isString().trim().notEmpty().isIn(["EFECTIVO", "TARJETA", "PAYPAL"]),
        body("productos", "No hay productos en la venta").exists().isObject().notEmpty(),
        number("productos.*", { articulo: "el" }),
        checkValidationResult,
      ];
    }

    case "editar": {
      return [
        param("ventaId", "Falta el id de la venta").exists().isString().trim().notEmpty(),
        body("metodo_pago", "Debes proporcionar un metodo de pago valido").optional().isString().trim().notEmpty().isIn(["EFECTIVO", "TARJETA", "PAYPAL"]),
        checkValidationResult,
      ];
    }
  }
}
