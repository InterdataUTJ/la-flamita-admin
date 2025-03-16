import mongoose from "mongoose";

const moduloSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
  tipo: { type: String, enum: ["SENSOR", "ACTUADOR"], required: true },
  token: { type: String, required: true },
  estado: { type: Boolean, required: true, default: true },
  datos: [{
    dato: { type: mongoose.Schema.Types.Mixed, required: true },
    timestamp: { type: Date, required: true, default: Date.now }
  }]
});

// Unique without counting undefined values
moduloSchema.index({ token: 1 }, { unique: true });
moduloSchema.index({ nombre: 1 }, { unique: true });
moduloSchema.index({ "datos.timestamp": 1 });

// Methods
moduloSchema.statics.listar = function(query = { estado: true }) {
  return this.find(query).lean();
}

moduloSchema.statics.mostrar = function(id, query = { estado: true }) {
  return this.findOne({ ...query, _id: id });
}
  

export default mongoose.model("Modulo", moduloSchema);