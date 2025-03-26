import {
  IconPencilPlus,
  IconPencilCog,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import EmpleadoService from "@/services/Empleados";
import { EmpleadoResponse } from "@/services/Empleados/types";

export default function EmpleadoListar() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState<EmpleadoResponse[]>([]);
  
  useEffect(() => {
    if (!auth.token) return;
    EmpleadoService.listar(auth.token)
      .then((empleados) =>
        setEmpleados(empleados)
      )
      .catch((err) => {
        if (err instanceof Error) alert(err.message);
        else alert("Ocurrió un error al listar los empleados");
        navigate("/panel", { replace: true });
      });
  }, [auth.token]);


  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol))
    return auth.goNotAllowed;


  const handleDelete = (id: string) => {
    if (!auth.token) return;
    if (!auth.user?.rol || auth.user?.rol !== "ADMINISTRADOR") return window.alert("Acceso no permitido");
    if (!window.confirm("Seguro que quieres eliminar este empleado?")) return;
    EmpleadoService.eliminar(auth.token, id)
      .then(() => {
        setEmpleados((empleados) => empleados.filter((empleado) => empleado._id !== id));
      })
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert("Ocurrió un error al eliminar el empleado");
      });
  }


  return (
    <Template title="Listar empleados">
      <Button as={Link} to="/empleado/crear">
        <IconPencilPlus />
        Crear
      </Button>

      <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                #
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Avatar
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Apellido
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Correo
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Rol
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado, idx) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {idx + 1}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={empleado.avatar}
                    alt="imagen"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <th
                  scope="row"
                  className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {empleado.nombre}
                </th>
                <td className="text-center px-6 py-4">{empleado.apellido}</td>
                <td className="text-center px-6 py-4">{empleado.correo}</td>
                <td className="text-center px-6 py-4">{empleado.rol}</td>
                <td className="text-center px-6 py-4 flex gap-4 justify-center items-center">
                  <Link to={`/empleado/editar/${empleado._id}`} className="flex justify-center items-center">
                    <IconPencilCog className="text-quinary-500 hover:scale-105 cursor-pointer" />
                  </Link>
                  <Link to={`/empleado/mostrar/${empleado._id}`} className="flex justify-center items-center">
                    <IconEye className="text-quaternary-500 hover:scale-105 cursor-pointer" />
                  </Link>
                  {auth.user?.rol === "ADMINISTRADOR" && (
                    <button onClick={() => handleDelete(empleado._id)} type="button" className="flex justify-center items-center">
                      <IconTrash className="hover:scale-105 text-primary-700 cursor-pointer" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
}
