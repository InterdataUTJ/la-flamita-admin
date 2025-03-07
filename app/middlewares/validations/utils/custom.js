import { check } from "express-validator";

const defaultOptions = {
  // general
  min: 3,
  max: 50,
  articulo: "El",
  optional: false,

  // number
  decimal: false,
  minNumber: 0,
  maxNumber: undefined,
}


export function text(campo, options = defaultOptions) {
  const newOptions = { ...defaultOptions, ...options };
  const articulo = [newOptions.articulo.charAt(0).toUpperCase() + newOptions.articulo.slice(1).toLowerCase(), newOptions.articulo.slice(1).toLowerCase()];
  let chain = check(campo);

  if (newOptions.optional) chain = chain.optional();
  else chain = chain.exists().withMessage(`Falta ${articulo[1]} ${campo}`);
  
  return chain
    .trim().notEmpty().withMessage(`${articulo[0]} ${campo} no puede estar vacio`)
    .isString().withMessage(`${articulo[0]} ${campo} debe ser texto`)
    .isLength({ min: newOptions.min, max: newOptions.max }).withMessage(`${articulo[0]} ${campo} debe tener entre ${newOptions.min} y ${newOptions.max} caracteres`);
}


export function email(campo, options) {
  const newOptions = { ...defaultOptions, ...options };
  const articulo = [newOptions.articulo.charAt(0).toUpperCase() + newOptions.articulo.slice(1).toLowerCase(), newOptions.articulo.slice(1).toLowerCase()];
  let chain = check(campo);
  
  if (newOptions.optional) chain = chain.optional();
  else chain = chain.exists().withMessage(`Falta ${articulo[1]} ${campo}`);
  
  return chain
    .trim().notEmpty().withMessage(`${articulo[0]} ${campo} no puede estar vacio`)
    .isString().withMessage(`${articulo[0]} ${campo} debe ser texto`)
    .isEmail().withMessage(`${articulo[0]} ${campo} debe ser un correo valido`);
}


export function number(campo, options = defaultOptions) {
  const newOptions = { ...defaultOptions, ...options };
  const articulo = [newOptions.articulo.charAt(0).toUpperCase() + newOptions.articulo.slice(1).toLowerCase(), newOptions.articulo.slice(1).toLowerCase()];
  let chain = check(campo).isNumeric().withMessage(`${articulo[0]} ${campo} debe ser un numero`);

  if (newOptions.optional) chain = chain.optional();
  else chain = chain.exists().withMessage(`Falta ${articulo[1]} ${campo}`);

  if (newOptions.decimal) return chain.isFloat({ max: newOptions.maxNumber, min: newOptions.minNumber })
    .withMessage(`${articulo[0]} ${campo} debe ser un numero decimal entre ${newOptions.minNumber} y ${newOptions.maxNumber ? newOptions.maxNumber : "cualquier numero"}`);
  else return chain.isInt({ max: newOptions.maxNumber, min: newOptions.minNumber })
    .withMessage(`${articulo[0]} ${campo} debe ser un numero entero entre ${newOptions.minNumber} y ${newOptions.maxNumber ? newOptions.maxNumber : "cualquier numero"}`);
}