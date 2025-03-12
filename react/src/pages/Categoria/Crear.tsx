import { useState } from "react";
import { useNavigate } from "react-router";
import { IconPencilPlus, IconTrash } from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { CategoriaRequest } from "@/services/Categorias/types";
import CategoriaService from "@/services/Categorias";

export default function CategoriaCrear() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [valores, setValores] = useState<string[]>([""]);

  if (!auth.token) return auth.goLogin;
  if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol)) return <p>Acceso no permitido</p>;

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

      await CategoriaService.crear(auth.token, objData);
      navigate("/categoria/listar", { replace: true });
    } catch (e: Error | unknown) { console.error(e); }
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
    <Template title="Crear empleados">
      <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">
        Crear categoría
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
            <IconPencilPlus />
            Crear categoría
          </Button>
        </form>
      </div>
    </Template>
  );
}
