import {
  IconPencilPlus,
  IconPencilCog,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import Template from "@/layout";
import useAuthContext from "@/hooks/AuthContext/hook";
import Button from "@/components/Button";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import CategoriaService from "@/services/Categorias";
import { CategoriaResponse } from "@/services/Categorias/types";

export default function CategoriaListar() {
  const auth = useAuthContext();
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  
  useEffect(() => {
    if (!auth.token) return;
    CategoriaService.listar(auth.token).then((categorias) =>
      setCategorias(categorias)
    );
  }, [auth.token]);


  if (!auth.token) return auth.goLogin;

  const handleDelete = (id: string) => {
    if (!auth.token) return;
    if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol)) return window.alert("Acceso no permitido");
    if (!window.confirm("Seguro que quieres eliminar esta categoría?")) return;

    CategoriaService.eliminar(auth.token, id).then(() => {
      setCategorias((categorias) => categorias.filter((categorias) => categorias._id !== id));
    });
  }


  return (
    <Template title="Listar categorias">
      { auth.user?.rol && ["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol) && (
        <Button as={Link} to="/categoria/crear">
          <IconPencilPlus />
          Crear
        </Button>
      )}

      <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                #
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Valores (#)
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria, idx) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {idx + 1}
                </th>
                <th
                  scope="row"
                  className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {categoria.nombre}
                </th>
                <td className="text-center px-6 py-4">{typeof categoria.datos === "number" ? categoria.datos : categoria.datos.length}</td>
                <td className="text-center px-6 py-4 flex gap-4 justify-center items-center">
                  
                  { auth.user?.rol && ["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol) && (
                    <Link to={`/categoria/editar/${categoria._id}`} className="flex justify-center items-center">
                      <IconPencilCog className="text-quinary-500 hover:scale-105 cursor-pointer" />
                    </Link>
                  )}

                  <Link to={`/categoria/mostrar/${categoria._id}`} className="flex justify-center items-center">
                    <IconEye className="text-quaternary-500 hover:scale-105 cursor-pointer" />
                  </Link>

                  { auth.user?.rol && ["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol) && (
                    <button onClick={() => handleDelete(categoria._id)} type="button" className="flex justify-center items-center">
                      <IconTrash className="hover:scale-105 text-primary-700 cursor-pointer" />
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
}
