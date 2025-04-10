import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IconDeviceFloppy, IconPencilPlus, IconTrash } from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { CategoriaRequest, CategoriaResponse } from "@/services/Categorias/types";
import CategoriaService from "@/services/Categorias";

export default function CategoriaEditar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState<CategoriaResponse>({} as CategoriaResponse);
  const [valores, setValores] = useState<string[]>([""]);

  useEffect(() => {
    if (!auth.token || !id) return;
    CategoriaService.mostrar(auth.token, id)
      .then((categoria) => {
        setCategoria(categoria);
        setValores(categoria.datos.map((v: { nombre: string, _id: string }) => v.nombre));
      })
      .catch((e: Error | unknown) => {
        if (e instanceof Error) alert(e.message);
        else alert("Error al cargar la categoría");
        navigate("/categoria/listar", { replace: true });
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
      const objData = {} as CategoriaRequest;

      if (formData.nombre) objData.nombre = formData.nombre as string;
      if (formData.descripcion) objData.descripcion = formData.descripcion as string;
      if (valores.length) objData.valores = valores;
      else return alert("Debes añadir al menos un valor");

      await CategoriaService.editar(auth.token, categoria._id, objData);
      navigate("/categoria/listar", { replace: true });
    } catch (e: Error | unknown) { 
      if (e instanceof Error) alert(e.message);
      else alert("Error al editar la categoría");
    }
    
    setLoading(false);
  };

  const handleAddValor = () => {
    setValores([...valores, ""]);
  };

  const handleRemoveValor = (index: number) => {
    if (valores.length === 1) return alert("No puedes eliminar todos los valores");
    setValores(valores.filter((_, i) => i !== index));
  };

  const handleEditValor = (index: number, value: string) => {
    setValores(valores.map((v, i) => i === index ? value : v));
  };


  return (
    <Template title="Editar categoría">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Editar categoría
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
            defaultValue={categoria.nombre}
          />

          <Input
            label="Descripción"
            name="descripcion"
            placeholder="Descripción"
            required
            minLength={3}
            defaultValue={categoria.descripcion}
          />

          <h2 className="font-bold text-2xl mt-5 mb-5 pb-4 border-b-2 border-quinary-700">Valores</h2>
          <div id="categoria-valores-contenedor" className="mb-5 flex flex-col gap-2">

            {valores.map((valor, i) => (
              <div className="flex" key={i}>
                <input 
                  type="text" 
                  name="valores[]" 
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                  placeholder="Nombre" 
                  required 
                  minLength={3} 
                  maxLength={50} 
                  value={valor}
                  onChange={(e) => handleEditValor(i, e.target.value)}
                />  
                <button 
                  onClick={() => handleRemoveValor(i)} 
                  type="button" 
                  className="bg-secondary-600 hover:bg-secondary-500 active:bg-secondary-700 px-4 rounded-r-lg text-white"
                >
                  <IconTrash />
                </button>
              </div>
            ))}

            <Button type="button" onClick={handleAddValor} color="tertiary">
              <IconPencilPlus />
              Añadir valor
            </Button>

          </div>


          <Button type="submit" loading={loading}>
            <IconDeviceFloppy />
            Editar categoría
          </Button>
        </form>
      </div>
    </Template>
  );
}
