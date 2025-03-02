// Dependencies
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import errorHandler from '#middlewares/error.middleware.js';
import print from '#util/print/index.js';
import '#config/db.config.js';


// Import routes
import categoriaRouter from '#routes/categoria.routes.js';
import clienteRouter from '#routes/cliente.routes.js';
import empleadoRouter from '#routes/empleado.routes.js';
import perfilRouter from '#routes/perfil.routes.js';
import productoRouter from '#routes/producto.routes.js';
import sensorRouter from '#routes/sensor.routes.js';
import ventaRouter from '#routes/venta.routes.js';


// Constants
const PORT = process.env.PORT || 8000;
const app = express();


// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());
app.use(express.static('public'));


// Routes
app.use('/api', perfilRouter);
app.use('/api/categoria', categoriaRouter);
app.use('/api/cliente', clienteRouter);
app.use('/api/empleado', empleadoRouter);
app.use('/api/producto', productoRouter);
app.use('/api/sensor', sensorRouter);
app.use('/api/venta', ventaRouter);


// Error handler
app.use(errorHandler);


// Start server
app.listen(PORT, () => {
  print.log(`Server is running on http://localhost:${PORT}`);
});