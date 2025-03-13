import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IconPencilPlus } from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import File from "@/components/Input/File";
import Button from "@/components/Button";
import { ProductoRequest } from "@/services/Productos/types";
import ProductoService from "@/services/Productos";
import { CategoriaResponse } from "@/services/Categorias/types";
import CategoriaService from "@/services/Categorias";

export default function ProductoCrear() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);


  useEffect(() => {
    if (!auth.token) return;
    CategoriaService.listar(auth.token)
      .then(categorias => setCategorias(categorias))
      .then(console.log)
      .catch(console.error);
  }, [auth.token]);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol)) return <p>Acceso no permitido</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.token) return;
    if (loading) return;
    setLoading(true);

    try {
      const oldForm = new FormData(e.currentTarget);
      const toSend: ProductoRequest = {} as ProductoRequest;

      toSend.nombre = oldForm.get("nombre") as string;
      toSend.descripcion = oldForm.get("descripcion") as string;
      toSend.precio = parseFloat(oldForm.get("precio") as string);
      toSend.existencias = parseInt(oldForm.get("existencias") as string);
      toSend.descuento = parseInt(oldForm.get("descuento") as string);
      toSend.fotos = oldForm.getAll("fotos") as File[];
      toSend.categorias = [];
      toSend.estado = true;

      oldForm.forEach((value, key) => {
        if (key.startsWith("categorias")) return toSend.categorias?.push(value as string);
      });

      await ProductoService.crear(auth.token, toSend);
      navigate("/producto/listar", { replace: true });
    } catch (e: Error | unknown) { console.error(e); }
    setLoading(false);
  };


  return (
    <Template title="Crear producto">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Crear producto
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
            label="Descripción"
            name="descripcion"
            placeholder="Descripción"
            required
            minLength={3}
          />

          <Input
            type="number"
            label="Precio (MXN)"
            name="precio"
            placeholder="Precio (MXN)"
            required
            min={0}
            step={0.1}
          />

          <Input
            type="number"
            label="Existencias"
            name="existencias"
            placeholder="Existencias"
            required
            min={0}
            step={1}
          />

          <Input
            type="number"
            label="Descuento (%)"
            name="descuento"
            placeholder="Descuento (%)"
            required
            min={0}
            step={1}
          />

          <File
            name="fotos"
            label="Fotos"
            description="Selecciona las fotos"
            multiple
            required
          />

          <h2 className="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Categorías</h2>

          {categorias.map((categoria) => (
            <>
              <h3 className="font-semibold text-lg mt-4 mb-2 pb-1 border-b-2 border-primary-700 max-w-prose">{ categoria.nombre }</h3>

              {Array.isArray(categoria.datos) && categoria.datos.map((dato) => (
                <div className="flex items-center mb-1">
                  <input 
                    name={`categorias[].${categoria._id}`} 
                    id={`categoria-valor-${dato._id}`} 
                    value={dato._id} 
                    type="radio" 
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-400 accent-primary-500 text-primary-500" 
                  />
                  <label 
                    htmlFor={`categoria-valor-${dato._id}`} 
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    { dato.nombre }
                  </label>
              </div>
              ))}
            </>
          ))}

          <Button type="submit" loading={loading} className="mt-4">
            <IconPencilPlus />
            Crear producto
          </Button>
        </form>
      </div>
    </Template>
  );
}
