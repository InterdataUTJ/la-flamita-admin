import { body, param } from "express-validator";
import { text } from '#middlewares/validations/utils/custom.js';
import checkValidationResult from "./utils/checkValidationResult.js";

export default function validate(method) {
  switch(method) {
    case "crear": {
      return [
        body("valores", "Los valores deben de ser un Array").exists().isArray({ min: 1 }),
        text("valores.*"),
        text("nombre"),
        text("descripcion", { max: 255, articulo: "la" }),
        checkValidationResult
      ]
    }

    case "editar": {
      return [
        param("categoriaId", "Falta el id de categoria").exists().isString().trim().notEmpty(),
        body("valores", "Los valores deben de ser un Array").optional().isArray({ min: 1 }),
        text("valores.*", { optional: true }),
        text("nombre", { optional: true }),
        text("descripcion", { optional: true, max: 255, articulo: "la" }),
        checkValidationResult
      ]
    }
  }
}