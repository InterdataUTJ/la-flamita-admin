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
import SensorService from "@/services/Sensores";
import { SensorResponse } from "@/services/Sensores/types";


export default function SensorListar() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [sensores, setSensores] = useState<SensorResponse[]>([]);
  
  useEffect(() => {
    if (!auth.token) return;
    SensorService.listar(auth.token)
      .then((sensores) =>
        setSensores(sensores)
      )
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert("Ocurrio un error al listar los dispositivos");
        navigate("/panel", { replace: true });
      });
  }, [auth.token]);


  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user.rol)) return auth.goNotAllowed;

  const handleDelete = (id: string) => {
    if (!auth.token) return;
    if (!window.confirm("Seguro que quieres eliminar este sensor?")) return;
    if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user.rol)) 
      return alert("No tienes permisos para eliminar sensores");
    
    SensorService.eliminar(auth.token, id)
      .then(() => {
        setSensores((sensores) => sensores.filter((sensor) => sensor._id !== id));
      })
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert("Ocurrio un error al eliminar el sensor");
      });
  }


  return (
    <Template title="Listar dispositivos IoT">
      { auth.user?.rol && ["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol) && (
        <Button as={Link} to="/sensor/crear">
          <IconPencilPlus />
          Crear dispositivo IoT
        </Button>
      )}

      <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                #
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Tipo
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Estado
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Datos <span className="text-[10px] text-gray-600">(#)</span>
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {sensores.map((sensor, idx) => (
              <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {idx + 1}
                </th>
                <th
                  scope="row"
                  className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {sensor.nombre}
                </th>
                <td className="text-center px-6 py-4">{sensor.tipo}</td>
                <td className="text-center px-6 py-4">{sensor.estado ? "Activo" : "Inactivo"}</td>
                <td className="text-center px-6 py-4">{sensor.datos.length}</td>
                <td className="text-center px-6 py-4 flex gap-4 justify-center items-center">

                  <Link to={`/sensor/editar/${sensor._id}`} className="flex justify-center items-center">
                    <IconPencilCog className="text-quinary-500 hover:scale-105 cursor-pointer" />
                  </Link>

                  <Link to={`/sensor/mostrar/${sensor._id}`} className="flex justify-center items-center">
                    <IconEye className="text-quaternary-500 hover:scale-105 cursor-pointer" />
                  </Link>

                  <button onClick={() => handleDelete(sensor._id)} type="button" className="flex justify-center items-center">
                    <IconTrash className="hover:scale-105 text-primary-700 cursor-pointer" />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
}
