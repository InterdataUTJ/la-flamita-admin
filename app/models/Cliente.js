import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  clave: String,
  avatar: String,
  estado: Boolean,
  google_id: String,
  remember_token: String,
  carrito: [{
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: Number,
    precio: Number,
    descuento: Number
  }]
});

// Unique without counting undefined values
empleadoSchema.index({ correo: 1 }, { unique: true, sparse: true });

// Methods
empleadoSchema.statics.listar = function() {
  return this.find({ estado: true }).select('-clave');
}

export default mongoose.model("Empleado", empleadoSchema);