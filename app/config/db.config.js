import mongoose from 'mongoose';
import print from '#util/print/index.js';

try {
  const { MONGODB_URI, MONGODB_DATABASE, MONGODB_REPLICASET } = process.env;
  print.log(`Connecting to MongoDB...`);
  const replica = Boolean(MONGODB_REPLICASET) ? `?replicaSet=${MONGODB_REPLICASET}` : '';
  await mongoose.connect(`${MONGODB_URI}/${MONGODB_DATABASE}${replica}`); 
} catch(err) {
  print.error(err.message);
}