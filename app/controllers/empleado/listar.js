import Empleado from "#models/Empleado.js";

export default async (_, res) => {
  try {
    const empleados = await Empleado.listar();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};