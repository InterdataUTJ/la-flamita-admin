import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authConfig from "#config/auth.config.js";

const apiTokenSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  jwt: { type: String, required: true }
});

// Unique without counting undefined values
apiTokenSchema.index({ jwt: 1 }, { unique: true });

// Methods
apiTokenSchema.statics.crear = function(user_id) {
  const newModel = new this();
  newModel.user_id = user_id;
  newModel.jwt = jwt.sign({ user_id, jti: newModel._id }, authConfig.secret, authConfig.options);
  newModel.save();
  return newModel.jwt;
}

apiTokenSchema.statics.verificar = function(token) {
  const decoded = jwt.verify(token, authConfig.secret, authConfig.options);
  const apiToken =  this.findOne({ user_id: decoded.user_id, _id: decoded.jti, jwt: token });
  return Boolean(apiToken);
}

apiTokenSchema.statics.eliminar = function(token) {
  const decoded = jwt.verify(token, authConfig.secret, authConfig.options);
  this.findOneAndDelete({ jwt: decoded.user_id, _id: decoded.jti, jwt: token });
}


export default mongoose.model("ApiToken", apiTokenSchema);