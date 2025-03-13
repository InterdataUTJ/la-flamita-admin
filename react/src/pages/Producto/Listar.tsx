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
import ProductoService from "@/services/Productos";
import { ProductoResponse } from "@/services/Productos/types";


export default function ProductoListar() {
  const auth = useAuthContext();
  const [productos, setProductos] = useState<ProductoResponse[]>([]);
  
  useEffect(() => {
    if (!auth.token) return;
    ProductoService.listar(auth.token).then((productos) =>
      setProductos(productos)
    );
  }, [auth.token]);


  if (!auth.token) return auth.goLogin;

  const handleDelete = (id: string) => {
    if (!auth.token) return;
    if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol)) return window.alert("Acceso no permitido");
    if (!window.confirm("Seguro que quieres eliminar este producto?")) return;
    ProductoService.eliminar(auth.token, id).then(() => {
      setProductos((productos) => productos.filter((producto) => producto._id !== id));
    });
  }


  return (
    <Template title="Listar productos">
      { auth.user?.rol && ["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol) && (
        <Button as={Link} to="/producto/crear">
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
                Imagen
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Precio <span className="text-[10px] text-gray-600">(MXN)</span>
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Existencias
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Descuento
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, idx) => (
              <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                  {producto.nombre}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={producto.fotos[0]}
                    alt="imagen"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="text-center px-6 py-4">${producto.precio}</td>
                <td className="text-center px-6 py-4">{producto.existencias}</td>
                <td className="text-center px-6 py-4">{producto.descuento}%</td>
                <td className="text-center px-6 py-4 flex gap-4 justify-center items-center">

                  { auth.user?.rol && ["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol) && (
                    <Link to={`/producto/editar/${producto._id}`} className="flex justify-center items-center">
                      <IconPencilCog className="text-quinary-500 hover:scale-105 cursor-pointer" />
                    </Link>
                  )}

                  <Link to={`/producto/mostrar/${producto._id}`} className="flex justify-center items-center">
                    <IconEye className="text-quaternary-500 hover:scale-105 cursor-pointer" />
                  </Link>

                  { auth.user?.rol && ["ADMINISTRADOR", "GERENTE"].includes(auth.user?.rol) && (
                    <button onClick={() => handleDelete(producto._id)} type="button" className="flex justify-center items-center">
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
