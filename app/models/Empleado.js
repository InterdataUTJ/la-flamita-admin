import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  clave: String,
  avatar: String,
  estado: Boolean,
  rol: { type: String, enum: ['ADMINISTRADOR', 'GERENTE', 'EMPLEADO'] },
});

// Unique without counting undefined values
empleadoSchema.index({ correo: 1 }, { unique: true, sparse: true });

// Methods
empleadoSchema.statics.listar = function() {
  return this.find({ estado: true }).select('-clave');
}

export default mongoose.model("Empleado", empleadoSchema);