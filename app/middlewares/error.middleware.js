import print from "#util/print/index.js";

// Error handler middleware
export default (err, req, res, next) => {
  print.error(req.method, `${req.originalUrl}:`, err.name, err.message);
  if (err.name && err.code && err.message) {
    return res.status(err.code).json({ message: err.message, name: err.name });
  }

  return res.status(500).json({ message: 'A ocurrido un error inesperado', name: err.name });
}


function errorMaker (name, defaultMessage = '', defaultCode = 500) {
  return (class ErrorMaker extends Error {
    constructor (message = defaultMessage, code = defaultCode) {
      super(message);
      this.name = name;
      this.code = code;
    }
  });
}




// ====================================
// ======                        ======
// ======       Error List       ======
// ======                        ======
// ====================================


// ===== Request Errors =====
/** Error en los datos enviados */
export const ValidationError = errorMaker('ValidationError', 'Error en los datos enviados: {{message}}', 400);



// ===== Auth Errors =====

/** No se encontro un JWT valido */
export const JwtMissingError = errorMaker('JwtMissingError', 'No se encontro un JWT valido', 403);
/** El JWT no es valido o esta expirado */
export const JwtInvalidError = errorMaker('JwtInvalidError', 'El JWT no es valido o esta expirado', 403);