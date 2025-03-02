import mongoose from "mongoose";

const moduloSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
  token: { type: String, required: true },
  datos: [{
    dato: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now }
  }]
});

// Unique without counting undefined values
moduloSchema.index({ token: 1 }, { unique: true });
moduloSchema.index({ nombre: 1 }, { unique: true });

// Methods
moduloSchema.statics.listar = function() {
  return this.find().select('-token');
}

export default mongoose.model("Modulo", moduloSchema);