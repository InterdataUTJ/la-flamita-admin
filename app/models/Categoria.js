import mongoose from "mongoose";

const categoriaDatosSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
});

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
  descripcion: { type: String, required: true },
  datos: [categoriaDatosSchema]
});

// Unique without counting undefined values
categoriaSchema.index({ nombre: 1 }, { unique: true });
categoriaDatosSchema.index({ nombre: 1 }, { unique: true });

// Methods
categoriaSchema.statics.listar = function() {
  return this.find();
}

export default mongoose.model("Categoria", categoriaSchema);