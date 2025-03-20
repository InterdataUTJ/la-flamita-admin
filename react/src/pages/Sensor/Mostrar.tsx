import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IconFlameFilled } from '@tabler/icons-react';
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import { SensorResponse } from "@/services/Sensores/types";
import SensorService from "@/services/Sensores";
import Button from "@/components/Button";
import LineChart from "@/components/Charts/Line";


export default function SensorMostrar() {
  const auth = useAuthContext();
  const { id } = useParams();
  const [sensor, setSensor] = useState({} as SensorResponse);
  const [loading, setLoading] = useState(false);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol))
    return <p>Acceso no permitido</p>;

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const handleToggleState = async () => {
    if (!auth.token || !id) return;
    setLoading(true);
    const dato = sensor.datos[0]?.dato === "1" ? "0" : "1";
    
    try {
      await SensorService.enviar(sensor.token, id, dato);
      await SensorService.mostrar(auth.token, id).then((sensor) =>
        setSensor(sensor)
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const updateData = () => {
    if (!auth.token || !id) return;
    SensorService.mostrar(auth.token, id).then((sensor) =>
      setSensor(sensor)
    );
  }

  useEffect(() => {
    updateData();
    let intervalId = setInterval(() => updateData(), 5000);

    return () => clearInterval(intervalId);
  }, [auth.token, id]);


  return (
    <Template title="Mostrar sensores">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Mostrar sensor
      </h2>
      <div className="mt-4">
        <form>
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
            disabled
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


          {sensor.tipo === "ACTUADOR" && (
            <>
              <h2 className="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Estado actual</h2>

              <div className="bg-white p-4 rounded-lg shadow-md border-gray-200 border-2 flex flex-col items-center gap-2">
                <span className="block text-center font-bold">{sensor.datos[0]?.dato === "1" ? "Encendido" : "Apagado"}</span>
                <span className="block text-center">{formatTimestamp(sensor.datos[0]?.timestamp)}</span>
                <Button
                  loading={loading}
                  onClick={handleToggleState}
                >
                  <IconFlameFilled size={17} />
                  {sensor.datos[0]?.dato === "1" ? "Apagar" : "Encender"}
                </Button>
              </div>
            </>
          )}
          


          {sensor.tipo === "SENSOR" && typeof sensor.datos !== "string" && (
            <>
              <h2 className="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Últimas lecturas</h2>

              <section className="grow flex flex-row justify-center items-center gap-2 flex-wrap">
              {sensor.datos[sensor.datos.length - 1]?.dato && (
                  Object.entries(sensor.datos[sensor.datos.length - 1].dato).map(([key, val]) => (
                      <div className="shadow border rounded p-3 w-60 aspect-square gap-2 flex flex-col justify-center items-center bg-white">
                        <span className="font-bold text-xl">{key}</span>
                        <span className="font-bold text-6xl mb-4">{val}</span>
                        <span className="italic">{formatTimestamp(sensor.datos[sensor.datos.length - 1].timestamp)}</span>
                      </div>
                  ))
                )}
                </section>

              <h2 className="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Datos capturados</h2>

              <section className="flex flex-wrap items-center justify-center mb-5 gap-4">
                {sensor.datos[0]?.dato && (
                  Object.keys(sensor.datos[0].dato).map((key) => (
                    <div className="shadow rounded p-3 w-full max-w-prose aspect-[2/1] bg-white" key={key}>
                      <LineChart 
                        dataKey={key}
                        title={`${sensor.nombre} - ${key}`}
                        data={sensor.datos}
                      />
                    </div>
                  ))
                )}
              </section>
            
            </>
          )}

        </form>
      </div>
    </Template>
  );
}
