import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IconDeviceFloppy } from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import File from "@/components/Input/File";
import Button from "@/components/Button";
import EmpleadoService from "@/services/Empleados";
import { EmpleadoRequest, EmpleadoResponse } from "@/services/Empleados/types";

export default function EmpleadoEditar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [empleado, setEmpleado] = useState<EmpleadoResponse>({} as EmpleadoResponse);


    
  useEffect(() => {
    if (!auth.token || !id) return;
    EmpleadoService.mostrar(auth.token, id)
      .then((empleado) =>
        setEmpleado(empleado)
      )
      .catch((e) => {
        if (e instanceof Error) alert(e.message);
        else alert("Ocurrió un error al cargar el empleado");
        navigate("/empleado/listar", { replace: true });
      });
  }, [auth.token, id]);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol)) return auth.goNotAllowed;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.token) return;
    if (loading) return;
    setLoading(true);

    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const toSend = {} as EmpleadoRequest;
      if (formData.clave !== formData.clave2) {
        alert("Las contraseñas no coinciden");
        return setLoading(false);;
      }

      if (formData.nombre && formData.nombre !== empleado.nombre) toSend.nombre = formData.nombre as string;
      if (formData.apellido && formData.apellido !== empleado.apellido) toSend.apellido = formData.apellido as string;
      if (formData.correo && formData.correo !== empleado.correo) toSend.correo = formData.correo as string;
      if (formData.rol && formData.rol !== empleado.rol) toSend.rol = formData.rol as string;
      if (formData.clave && formData.clave2 && formData.clave === formData.clave2) toSend.clave = formData.clave as string;
      if (formData.avatar && (formData.avatar as File).name !== "" ) toSend.avatar = formData.avatar as File;

      await EmpleadoService.editar(auth.token, empleado._id, toSend);
      navigate("/empleado/listar", { replace: true });
    } catch (e: Error | unknown) { 
      if (e instanceof Error) alert(e.message);
      else alert("Ocurrió un error al editar el empleado");
    }
    setLoading(false);
  };


  return (
    <Template title="Crear empleados">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Editar empleado
      </h2>
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            name="nombre"
            placeholder="Nombre"
            required
            minLength={3}
            maxLength={50}
            defaultValue={empleado.nombre}
          />

          <Input
            label="Apellido"
            name="apellido"
            placeholder="Apellido"
            required
            minLength={3}
            maxLength={50}
            defaultValue={empleado.apellido}
          />

          <Input
            type="email"
            label="Correo"
            name="correo"
            placeholder="Correo"
            required
            defaultValue={empleado.correo}
          />

          <Input
            type="password"
            label="Contraseña"
            name="clave"
            placeholder="Contraseña"
            minLength={8}
            maxLength={50}
          />

          <Input
            type="password"
            label="Repetir contraseña"
            name="clave2"
            placeholder="Contraseña"
            minLength={8}
            maxLength={50}
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
              defaultValue={empleado.rol}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="GERENTE">Gerente</option>
              <option value="EMPLEADO">Empleado</option>
            </select>
          </div>

          <File
            name="avatar"
            label="Avatar"
            description="Selecciona el nuevo avatar"
          />

          <Button type="submit" loading={loading}>
            <IconDeviceFloppy />
            Editar empleado
          </Button>
        </form>
      </div>
    </Template>
  );
}
