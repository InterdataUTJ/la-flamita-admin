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



// ===== Perfil Errors =====

/** No se encontro un JWT valido */
export const JwtMissingError = errorMaker('JwtMissingError', 'No se encontro un JWT valido', 403);
/** El JWT no es valido o esta expirado */
export const JwtInvalidError = errorMaker('JwtInvalidError', 'El JWT no es valido o esta expirado', 403);
/** No estas autenticado */
export const AuthNeededError = errorMaker('AuthNeededError', 'No estas autenticado', 403);
/** Las credenciales no son correctas */
export const InvalidAuthError = errorMaker('InvalidAuthError', 'Las credenciales no son correctas', 400);
/** Error al actualizar el perfil */
export const PerfilUpdateError = errorMaker('PerfilUpdateError', 'Error al actualizar el perfil', 500);



// ===== Empleado Errors =====

/** Error al listar los emplados */
export const EmpleadoListError = errorMaker('EmpleadoListError', 'Error al listar los emplados', 500);
/** Error al crear el emplado */
export const EmpleadoCreateError = errorMaker('EmpleadoCreateError', 'Error al crear el emplado', 500);
/** Error al editar el emplado */
export const EmpleadoUpdateError = errorMaker('EmpleadoUpdateError', 'Error al editar el emplado', 500);
/** Error al eliminar el emplado */
export const EmpleadoDeleteError = errorMaker('EmpleadoDeleteError', 'Error al eliminar el emplado', 500);
/** Error al mostrar el emplado */
export const EmpleadoShowError = errorMaker('EmpleadoShowError', 'Error al mostrar el emplado', 500);



// ===== Producto Errors =====

/** Error al listar los productos */
export const ProductoListError = errorMaker('ProductoListError', 'Error al listar los productos', 500);
/** Error al crear el producto */
export const ProductoCreateError = errorMaker('ProductoCreateError', 'Error al crear el producto', 500);
/** Error al editar el producto */
export const ProductoUpdateError = errorMaker('ProductoUpdateError', 'Error al editar el producto', 500);
/** Error al eliminar el producto */
export const ProductoDeleteError = errorMaker('ProductoDeleteError', 'Error al eliminar el producto', 500);
/** Error al mostrar el producto */
export const ProductoShowError = errorMaker('ProductoShowError', 'Error al mostrar el producto', 500);



// ===== Cliente Errors =====

/** Error al listar los productos */
export const ClienteListError = errorMaker('ClienteListError', 'Error al listar los Clientes', 500);
/** Error al crear el Cliente */
export const ClienteCreateError = errorMaker('ClienteCreateError', 'Error al crear el Cliente', 500);
/** Error al editar el Cliente */
export const ClienteUpdateError = errorMaker('ClienteUpdateError', 'Error al editar el Cliente', 500);
/** Error al eliminar el Cliente */
export const ClienteDeleteError = errorMaker('ClienteDeleteError', 'Error al eliminar el Cliente', 500);
/** Error al mostrar el Cliente */
export const ClienteShowError = errorMaker('ClienteShowError', 'Error al mostrar el Cliente', 500);



// ===== Categoria Errors =====

/** Error al listar los productos */
export const CategoriaListError = errorMaker('CategoriaListError', 'Error al listar los Categorias', 500);
/** Error al crear el Categoria */
export const CategoriaCreateError = errorMaker('CategoriaCreateError', 'Error al crear el Categoria', 500);
/** Error al editar el Categoria */
export const CategoriaUpdateError = errorMaker('CategoriaUpdateError', 'Error al editar el Categoria', 500);
/** Error al eliminar el Categoria */
export const CategoriaDeleteError = errorMaker('CategoriaDeleteError', 'Error al eliminar el Categoria', 500);
/** Error al mostrar el Categoria */
export const CategoriaShowError = errorMaker('CategoriaShowError', 'Error al mostrar el Categoria', 500);



// ===== Sensor Errors =====

/** Error al listar los productos */
export const SensorListError = errorMaker('SensorListError', 'Error al listar los Sensores', 500);
/** Error al crear el Sensor */
export const SensorCreateError = errorMaker('SensorCreateError', 'Error al crear el Sensor', 500);
/** Error al editar el Sensor */
export const SensorUpdateError = errorMaker('SensorUpdateError', 'Error al editar el Sensor', 500);
/** Error al eliminar el Sensor */
export const SensorDeleteError = errorMaker('SensorDeleteError', 'Error al eliminar el Sensor', 500);
/** Error al mostrar el Sensor */
export const SensorShowError = errorMaker('SensorShowError', 'Error al mostrar el Sensor', 500);
/** Error al enviar datos del Sensor */
export const SensorSendError = errorMaker('SensorSendError', 'Error al guardar datos del Sensor', 400);



// ===== Venta Errors =====

/** Error al listar los productos */
export const VentaListError = errorMaker('VentaListError', 'Error al listar los Ventas', 500);
/** Error al crear el Venta */
export const VentaCreateError = errorMaker('VentaCreateError', 'Error al crear el Venta', 500);
/** Error al editar el Venta */
export const VentaUpdateError = errorMaker('VentaUpdateError', 'Error al editar el Venta', 500);
/** Error al eliminar el Venta */
export const VentaDeleteError = errorMaker('VentaDeleteError', 'Error al eliminar el Venta', 500);
/** Error al mostrar el Venta */
export const VentaShowError = errorMaker('VentaShowError', 'Error al mostrar el Venta', 500);