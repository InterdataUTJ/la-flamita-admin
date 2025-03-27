import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import Template from "@/layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import VentaService from "@/services/Ventas";
import { useNavigate } from "react-router";

export default function EntregarVenta() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [qrCode, setQrCode] = useState<string>("");
  const [cameraList, setCameraList] = useState<QrScanner.Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("environment");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [scannerState, setScannerState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResult = (result: QrScanner.ScanResult) => {
    setQrCode(result.data);
    setScannerState(false);
  };

  useEffect(() => {
    // Inicializamos el scanner cuando el componente se monta
    if (videoRef.current) {
      const scanner = new QrScanner(videoRef.current, handleResult, {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });

      scanner.setInversionMode("both");
      scannerRef.current = scanner;

      // Listar las cámaras disponibles
      QrScanner.listCameras(true).then((cameras: QrScanner.Camera[]) => {
        setCameraList(cameras);
        if (cameras.length > 0) {
          setSelectedCamera(cameras[0].id); // Seleccionamos la primera cámara por defecto
        }
      });

      return () => {
        scanner.stop(); // Limpiar el scanner al desmontar el componente
        scanner.destroy();
        scannerRef.current = null;
      };
    }
  }, []);

  useEffect(() => {
    if (scannerRef.current) {
      scannerRef.current.setCamera(selectedCamera).then(() => {
        scannerRef.current?.start();
      });
    }
  }, [selectedCamera]);

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCamera(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    if (!auth.token) return;
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const token = formData.get("token") as string;
      await VentaService.entregar(auth.token, token);
      const ventaId = token.split(":")[0];
      navigate(`/venta/mostrar/${ventaId}`, { replace: true });
    } catch(e: Error | unknown) {
      if (e instanceof Error) alert(e.message);
      else alert("Error al entregar la venta");
    }

    setLoading(false);
  };

  if (!auth.token) return auth.goLogin;

  return (
    <Template title="Entregar venta">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">Entregar venta</h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Token de entrega"
          name="token"
          placeholder="Token de entrega"
          required
          minLength={10}
          maxLength={100}
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
        />

        <div className={scannerState ? "block" : "hidden"}>
          <div className="mb-5">
            <label htmlFor="camara" className="block mb-2 text-sm font-medium text-gray-900">Camara a utilizar *</label>
            <select
              value={selectedCamera}
              onChange={handleCameraChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              {cameraList.map((camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.label || `Camera ${camera.id}`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5 w-1/2 rounded-lg mx-auto overflow-hidden border-primary-600 border-4 shadow">
            <video ref={videoRef} className="w-full"></video>
          </div>
        </div>
        

        <Button type="submit" loading={loading}>
          Entregar venta
        </Button>
      </form>

      <p onClick={() => setScannerState(true)} className="text-primary-700 font-semibold my-2 italic cursor-pointer hover:underline select-none" title="Usar camara" >Escanear el codigo QR.</p>

    </Template>
  );
};