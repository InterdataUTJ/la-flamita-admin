import { useState } from "react";
import { useNavigate } from "react-router";
import { IconPencilPlus } from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import File from "@/components/Input/File";
import Button from "@/components/Button";
import EmpleadoService from "@/services/Empleados";

export default function EmpleadoCrear() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol)) return auth.goNotAllowed;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.token) return;
    if (loading) return;
    setLoading(true);

    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      if (formData.clave !== formData.clave2) {
        alert("Las contraseñas no coinciden");
        return setLoading(false);;
      }

      await EmpleadoService.crear(auth.token, formData);
      navigate("/empleado/listar", { replace: true });
    } catch (e: Error | unknown) { 
      if (e instanceof Error) alert(e.message);
      else alert("Ocurrió un error al crear el empleado");
    }
    setLoading(false);
  };


  return (
    <Template title="Crear empleados">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Crear empleado
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
          />

          <Input
            label="Apellido"
            name="apellido"
            placeholder="Apellido"
            required
            minLength={3}
            maxLength={50}
          />

          <Input
            type="email"
            label="Correo"
            name="correo"
            placeholder="Correo"
            required
          />

          <Input
            type="password"
            label="Contraseña"
            name="clave"
            placeholder="Contraseña"
            minLength={8}
            maxLength={50}
            required
          />

          <Input
            type="password"
            label="Repetir contraseña"
            name="clave2"
            placeholder="Contraseña"
            minLength={8}
            maxLength={50}
            required
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
              defaultValue="EMPLEADO"
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
            description="Selecciona tu nuevo avatar"
          />

          <Button type="submit" loading={loading}>
            <IconPencilPlus />
            Crear empleado
          </Button>
        </form>
      </div>
    </Template>
  );
}
