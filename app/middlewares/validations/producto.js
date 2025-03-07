import { body, param } from "express-validator";
import { files } from '#middlewares/validations/utils/file.js';
import { number, text } from '#middlewares/validations/utils/custom.js';
import checkValidationResult from './utils/checkValidationResult.js';

export default function validate(method) {
  switch (method) {
    case "crear": {
      return [
        text("nombre"),
        text("descripcion", { max: 500, articulo: "la" }),
        number("precio", { minNumber: 0, decimal: true }),
        number("existencias", { minNumber: 0, decimal: false, articulo: "las" }),
        number("descuento", { minNumber: 0, decimal: true }),
        body("categorias", "Las categorias deben de ser un Array").exists().isArray({ min: 1 }),
        body("categorias.*", "Faltan las categorias").exists().isString().trim().notEmpty(),
        files("fotos", "Faltan las fotos"),
        checkValidationResult
      ]
    }

    case "editar": {
        return [
            param("productoId", "Falta el id del producto").exists(),
            text("nombre", { optional: true }),
            text("descripcion", { optional: true, max: 500, articulo: "la" }),
            number("precio", { optional: true, minNumber: 0, decimal: true }),
            number("existencias", { optional: true, minNumber: 0, decimal: false, articulo: "las" }),
            number("descuento", { optional: true, minNumber: 0, decimal: true }),

            body("categorias", "Las categorias deben de ser un Array").optional().isArray({ min: 1 }),
            body("categorias.*", "Faltan las categorias").optional().isString().trim().notEmpty(),
            checkValidationResult
        ]
    }
      
  }
}