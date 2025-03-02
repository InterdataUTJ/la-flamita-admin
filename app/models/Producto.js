import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  existencias: { type: Number, required: true },
  estado: { type: Boolean, required: true },
  descuento: { type: Number, required: true },
  fotos: [String],
  categorias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria.datos"
  }]
});

// Methods
productoSchema.statics.listar = function() {
  return this.find();
}

export default mongoose.model("Producto", productoSchema);