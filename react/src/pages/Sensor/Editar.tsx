import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IconDeviceFloppy } from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { SensorRequest, SensorResponse } from "@/services/Sensores/types";
import SensorService from "@/services/Sensores";

export default function SensorEditar() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [sensor, setSensor] = useState({} as SensorResponse);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol))
    return auth.goNotAllowed;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.token || !id) return;
    if (loading) return;
    setLoading(true);

    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const objData = {} as SensorRequest;
      if (formData.nombre && formData.nombre !== sensor.nombre)
        objData.nombre = formData.nombre as string;

      await SensorService.editar(auth.token, id, objData);
      navigate("/sensor/listar", { replace: true });
    } catch (e: Error | unknown) {
      if (e instanceof Error) alert(e.message);
      else alert("Ocurrio un error al editar el dispositivo");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!auth.token || !id) return;
    SensorService.mostrar(auth.token, id)
      .then((sensor) => setSensor(sensor))
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert("Ocurrio un error al cargar el dispositivo");
        navigate("/sensor/listar", { replace: true });
      });
  }, [auth.token, id]);

  return (
    <Template title="Editar dispositivo IoT">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Editar dispositivo IoT
      </h2>
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <Input
            label="ID"
            name="id"
            placeholder="ID"
            required
            disabled
            defaultValue={sensor._id}
          />

          <Input
            label="Nombre"
            name="nombre"
            placeholder="Nombre"
            required
            minLength={3}
            maxLength={50}
            defaultValue={sensor.nombre}
          />

          <Input
            label="Tipo"
            name="tipo"
            placeholder="Tipo"
            required
            disabled
            defaultValue={sensor.tipo}
          />

          <Input
            label="Token (API Key)"
            name="token"
            placeholder="Token (API Key)"
            required
            disabled
            defaultValue={sensor.token}
          />

          <Button type="submit" loading={loading}>
            <IconDeviceFloppy />
            Editar dispositivo IoT
          </Button>
        </form>
      </div>
    </Template>
  );
}
