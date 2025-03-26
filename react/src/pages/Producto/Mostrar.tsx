import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import { ProductoResponse } from "@/services/Productos/types";
import ProductoService from "@/services/Productos";
import { CategoriaResponse } from "@/services/Categorias/types";
import CategoriaService from "@/services/Categorias";

export default function ProductoMostrar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuthContext();
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [producto, setProducto] = useState<ProductoResponse>({} as ProductoResponse);


  useEffect(() => {
    if (!auth.token || !id) return;
    Promise.all([
      CategoriaService.listar(auth.token)
        .then(categorias => setCategorias(categorias)),
      
      ProductoService.mostrar(auth.token, id)
        .then(producto => setProducto(producto)),
    ]).catch(e => {
      if (e instanceof Error) alert(e.message);
      else alert("Ocurrion un error al mostrar el producto");
      navigate("/panel", { replace: true });
    });
  }, [auth.token, id]);

  
  if (!auth.token) return auth.goLogin;


  return (
    <Template title="Mostrar producto">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Mostrar producto
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
            defaultValue={producto.nombre}
            disabled
          />

          <Input
            label="Descripción"
            name="descripcion"
            placeholder="Descripción"
            required
            minLength={3}
            defaultValue={producto.descripcion}
            disabled
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
            disabled
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
            disabled
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
            disabled
          />

          <div className="mb-5">
            <label htmlFor="clave" className="block mb-2 text-sm font-semibold text-gray-900">Imagenes</label>
            <div className="flex gap-4 flex-wrap">
              { producto.fotos?.map((foto) => (
                <img className="h-48 w-auto rounded" src={foto} alt={producto.nombre} />
              ))}
            </div>
          </div>

          <h2 className="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Categorías</h2>

          {categorias.map((categoria) => (
            <div key={categoria._id}>
              <h3 className="font-semibold text-lg mt-4 mb-2 pb-1 border-b-2 border-primary-700 max-w-prose">{ categoria.nombre }</h3>

              {producto.nombre && Array.isArray(categoria.datos) && categoria.datos.map((dato) => (
                <div className="flex items-center mb-1" key={dato._id}>
                  <input 
                    name={`categorias[].${categoria._id}`} 
                    id={`categoria-valor-${dato._id}`} 
                    value={dato._id} 
                    type="radio" 
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-400 accent-primary-500 text-primary-500" 
                    checked={producto.categorias?.includes(dato._id)}
                    disabled
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

        </form>
      </div>
    </Template>
  );
}
