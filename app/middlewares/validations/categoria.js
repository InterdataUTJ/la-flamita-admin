import { body, param } from "express-validator";

export default function validate(method) {
  switch(method) {
    case "crear": {
      return [
        body("valores", "Los valores deben de ser un Array").exists().isArray(),
        body("nombre", "El nombre es invalido").exists().isLength({ min: 3, max: 50 }),
        body("descripcion", "La descipcion es invalida").exists(),
      ]
    }

    case "editar": {
      return [
        param("categoriaId", "Falta el id de categoria").exists(),
        body("valores", "Los valores deben de ser un Array").optional().isArray(),
        body("nombre", "El nombre es invalido").optional().isLength({ min: 3, max: 50 }),
        body("descripcion", "La descipcion es invalida").optional(),
      ]
    }
  }
}