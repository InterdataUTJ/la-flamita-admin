import { body } from "express-validator";

export default function validate(method) {
  switch(method) {
    case "login": {
      return [
        body("correo", "Falta el correo").exists().isEmail(),
        body("clave", "Falta la clave").exists(),
      ]
    }
  }
}