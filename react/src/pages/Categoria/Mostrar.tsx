import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import { CategoriaResponse } from "@/services/Categorias/types";
import CategoriaService from "@/services/Categorias";

export default function CategoriaMostrar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuthContext();
  const [categoria, setCategoria] = useState<CategoriaResponse>({} as CategoriaResponse);
  const [valores, setValores] = useState<string[]>([""]);

  useEffect(() => {
    if (!auth.token || !id) return;
    CategoriaService.mostrar(auth.token, id)
      .then((categoria) => {
        setCategoria(categoria);
        setValores(categoria.datos.map((v: { nombre: string, _id: string }) => v.nombre));
      })
      .catch((err) => {
        if (err instanceof Error) alert(err.message);
        else alert("Ocurrió un error al cargar la categoría");
        navigate("/categoria/listar", { replace: true });
      });
  }, [auth.token, id]);


  if (!auth.token) return auth.goLogin;


  return (
    <Template title="Mostrar categoría">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Mostrar categoría
      </h2>
      <div className="mt-4">
        <form>
          <Input
            label="Nombre"
            name="nombre"
            placeholder="Nombre"
            required
            defaultValue={categoria.nombre}
            disabled
          />

          <Input
            label="Descripción"
            name="descripcion"
            placeholder="Descripción"
            required
            minLength={3}
            defaultValue={categoria.descripcion}
            disabled
          />

          <h2 className="font-bold text-2xl mt-5 mb-5 pb-4 border-b-2 border-quinary-700">Valores</h2>
          <div id="categoria-valores-contenedor" className="mb-5 flex flex-col gap-2">

            {valores.map((valor, i) => (
              <div className="flex" key={i}>
                <input 
                  type="text" 
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                  placeholder="Nombre" 
                  required 
                  value={valor}
                  disabled
                />
              </div>
            ))}

          </div>
        </form>
      </div>
    </Template>
  );
}
