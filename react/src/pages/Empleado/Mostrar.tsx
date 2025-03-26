import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import EmpleadoService from "@/services/Empleados";
import { EmpleadoResponse } from "@/services/Empleados/types";

export default function EmpleadoMostrar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [empleado, setEmpleado] = useState<EmpleadoResponse>({} as EmpleadoResponse);

  useEffect(() => {
    if (!auth.token || !id) return;
    EmpleadoService.mostrar(auth.token, id)
      .then((empleado) =>
        setEmpleado(empleado)
      )
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert("Ocurrió un error al cargar el empleado");
        navigate("/empleado/listar", { replace: true });
      });
  }, [auth.token, id]);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol)) return auth.goNotAllowed;


  return (
    <Template title="Mostrar empleados">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Mostrar empleado
      </h2>
      <div className="mt-4">
        <form>
          <Input
            label="Nombre"
            name="nombre"
            placeholder="Nombre"
            required
            minLength={3}
            maxLength={50}
            value={empleado.nombre}
            disabled
          />

          <Input
            label="Apellido"
            name="apellido"
            placeholder="Apellido"
            required
            minLength={3}
            maxLength={50}
            value={empleado.apellido}
            disabled
          />

          <Input
            type="email"
            label="Correo"
            name="correo"
            placeholder="Correo"
            required
            value={empleado.correo}
            disabled
          />

          <div className="mb-5">
            <label
              htmlFor="rol"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Rol *
            </label>
            <select
              name="rol"
              id="rol"
              value={empleado.rol}
              disabled
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="GERENTE">Gerente</option>
              <option value="EMPLEADO">Empleado</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
            <img className="w-20 h-20 rounded-full object-cover" src={empleado.avatar} alt="Avatar"/>
          </div>
        </form>
      </div>
    </Template>
  );
}
