import { useState } from "react";
import { useNavigate } from "react-router";
import { IconPencilPlus } from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { SensorRequest } from "@/services/Sensores/types";
import SensorService from "@/services/Sensores";

export default function SensorCrear() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol))
    return <p>Acceso no permitido</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.token) return;
    if (loading) return;
    setLoading(true);


    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const objData = {} as SensorRequest;
      objData.nombre = formData.nombre as string;
      objData.tipo = formData.tipo as "SENSOR" | "ACTUADOR";

      await SensorService.crear(auth.token, objData);
      navigate("/sensor/listar", { replace: true });
    } catch (e: Error | unknown) {
      console.error(e);
    }
    setLoading(false);
  };


  return (
    <Template title="Crear sensores">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Crear sensor
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

          <div className="mb-5">
            <label
              htmlFor="tipo"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tipo *
            </label>
            <select
              name="tipo"
              id="tipo"
              defaultValue="SENSOR"
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value="SENSOR">Sensor</option>
              <option value="ACTUADOR">Actuador</option>
            </select>
          </div>

          <Button type="submit" loading={loading}>
            <IconPencilPlus />
            Crear sensor
          </Button>
        </form>
      </div>
    </Template>
  );
}
