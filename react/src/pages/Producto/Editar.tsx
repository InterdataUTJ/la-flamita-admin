import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IconDeviceFloppy } from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import File from "@/components/Input/File";
import Button from "@/components/Button";
import { ProductoRequest, ProductoResponse } from "@/services/Productos/types";
import ProductoService from "@/services/Productos";
import { CategoriaResponse } from "@/services/Categorias/types";
import CategoriaService from "@/services/Categorias";

export default function ProductoEditar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [producto, setProducto] = useState<ProductoResponse>({} as ProductoResponse);


  useEffect(() => {
    if (!auth.token || !id) return;
    Promise.all([
      CategoriaService.listar(auth.token)
      .then(categorias => setCategorias(categorias)),
    
      ProductoService.mostrar(auth.token, id)
        .then(producto => setProducto(producto))
    ]).catch(e => {
      if (e instanceof Error) alert(e.message);
      else alert("Ocurrion un error al cargar el producto");
      navigate("/producto/listar", { replace: true });
    });

  }, [auth.token, id]);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol)) return auth.goNotAllowed;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.token || !id) return;
    if (loading) return;
    setLoading(true);

    try {
      const oldForm = new FormData(e.currentTarget);
      const toSend: ProductoRequest = {} as ProductoRequest;

      // Espero que esto nunca se rompa....
      // Porque ahora no hay quien entienda esta mierda >:O
      
      if (oldForm.get("nombre") && oldForm.get("nombre") !== producto.nombre) toSend.nombre = oldForm.get("nombre") as string;
      if (oldForm.get("descripcion") && oldForm.get("descripcion") !== producto.descripcion) toSend.descripcion = oldForm.get("descripcion") as string;
      if (oldForm.get("precio") && parseFloat(oldForm.get("precio") as string) !== producto.precio) toSend.precio = parseFloat(oldForm.get("precio") as string);
      if (oldForm.get("existencias") && parseInt(oldForm.get("existencias") as string) !== producto.existencias) toSend.existencias = parseInt(oldForm.get("existencias") as string);
      if (oldForm.get("descuento") && parseInt(oldForm.get("descuento") as string) !== producto.descuento) toSend.descuento = parseInt(oldForm.get("descuento") as string);
      if (oldForm.getAll("fotos").length) toSend.fotos = oldForm.getAll("fotos") as File[];
      if (toSend.fotos && toSend.fotos.length === 1 && toSend.fotos[0].name === "") delete toSend.fotos;
      oldForm.forEach((value, key) => {
        if (!key.startsWith("categorias")) return; 
        if (toSend.categorias === undefined) toSend.categorias = [];
        toSend.categorias?.push(value as string);
      });

      if (!toSend.categorias?.length) throw new Error("Selecciona al menos una categoría");

      await ProductoService.editar(auth.token, id, toSend);
      navigate("/producto/listar", { replace: true });
    } catch (e: Error | unknown) { 
      if (e instanceof Error) alert(e.message);
      else alert("Ocurrion un error al editar el producto");
    }
    setLoading(false);
  };


  return (
    <Template title="Editar producto">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Editar producto
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
            defaultValue={producto.nombre}
          />

          <Input
            label="Descripción"
            name="descripcion"
            placeholder="Descripción"
            required
            minLength={3}
            defaultValue={producto.descripcion}
          />

          <Input
            type="number"
            label="Precio (MXN)"
            name="precio"
            placeholder="Precio (MXN)"
            required
            min={0}
            step={0.1}
            defaultValue={producto.precio?.toString()}
          />

          <Input
            type="number"
            label="Existencias"
            name="existencias"
            placeholder="Existencias"
            required
            min={0}
            step={1}
            defaultValue={producto.existencias?.toString()}
          />

          <Input
            type="number"
            label="Descuento (%)"
            name="descuento"
            placeholder="Descuento (%)"
            required
            min={0}
            step={1}
            defaultValue={producto.descuento?.toString()}
          />

          <File
            name="fotos"
            label="Fotos"
            description="Selecciona las fotos"
            multiple
          />

          <h2 className="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Categorías</h2>

          {categorias.map((categoria) => (
            <div key={categoria._id}>
              <h3 key={categoria._id} className="font-semibold text-lg mt-4 mb-2 pb-1 border-b-2 border-primary-700 max-w-prose">{ categoria.nombre }</h3>

              {producto.nombre && Array.isArray(categoria.datos) && categoria.datos.map((dato) => (
                <div className="flex items-center mb-1" key={dato._id}>
                  <input 
                    name={`categorias[].${categoria._id}`} 
                    id={`categoria-valor-${dato._id}`} 
                    value={dato._id} 
                    type="radio" 
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-400 accent-primary-500 text-primary-500" 
                    defaultChecked={producto.categorias?.includes(dato._id)}
                  />
                  <label 
                    htmlFor={`categoria-valor-${dato._id}`} 
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    { dato.nombre }
                  </label>
                </div>
              ))}
            </div>
          ))}

          <Button type="submit" loading={loading} className="mt-4">
            <IconDeviceFloppy />
            Editar producto
          </Button>
        </form>
      </div>
    </Template>
  );
}
