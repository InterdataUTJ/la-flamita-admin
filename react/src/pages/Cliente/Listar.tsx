
import { IconPencilPlus, IconPencilCog, IconEye, IconTrash, } from "@tabler/icons-react";
import ClienteService from '@/services/Clientes';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ClienteResponse } from "@/services/Clientes/types";
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";


export default function ClienteListar() {
    const navigate = useNavigate();
    const auth = useAuthContext();
    const [clientes, setClientes] = useState<ClienteResponse[]>([]);

    //Mediante el hook useEffect se obtienen los clientes de la APi
    useEffect(() => {
        if (!auth.token) return;
        ClienteService.listar(auth.token)
            .then((clientes) =>
                setClientes(clientes)
            )
            .catch((error) => {
                if (error instanceof Error) alert(error.message);
                else alert("Ha ocurrido un error al obtener los clientes");
                navigate("/panel", { replace: true });
            });
    }, [auth.token]);

    if (!auth.token) return auth.goLogin;

    //Funcion para eliminar un clinente
    const handleDelete = (id: string) => {
        if (!auth.token) return;
        if (!auth.user?.rol || auth.user?.rol !== "ADMINISTRADOR") return window.alert("Acceso no permitido");
        if (!window.confirm("Seguro que quieres eliminar este cliente?")) return;
        ClienteService.eliminar(auth.token, id)
            .then(() => {
                setClientes(clientes.filter((cliente) => cliente._id !== id));
            })
            .catch((error) => {
                if (error instanceof Error) alert(error.message);
                else alert("Ha ocurrido un error al eliminar el cliente");
            });
    };

    return (
        <Template title="Listar Clientes">
            {auth.user?.rol === "ADMINISTRADOR" && (
                <Button as={Link} to="/cliente/crear">
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
                                Avatar
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Apellido
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Correo
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, idx) => (
                            <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {idx + 1}
                                </th>
                                <td className="px-6 py-4">
                                    <img src={cliente.avatar} alt="imagen" className="w-10 h-10 rounded-full" />
                                </td>
                                <th scope="row" className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {cliente.nombre}
                                </th>
                                <td className="text-center px-6 py-4">
                                    {cliente.apellido}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {cliente.correo}
                                </td>
                                <td className="text-center px-6 py-4 flex gap-4 justify-center items-center">
                                    { auth.user?.rol && ["ADMINISTRADOR"].includes(auth.user?.rol) && (
                                        <Link to={`/cliente/editar/${cliente._id}`} className="flex justify-center items-center">
                                            <IconPencilCog className="text-quinary-500 hover:scale-105 cursor-pointer" />
                                        </Link>
                                    )}

                                    <Link to={`/cliente/mostrar/${cliente._id}`} className="flex justify-center items-center">
                                        <IconEye className="text-quaternary-500 hover:scale-105 cursor-pointer" />
                                    </Link>

                                    { auth.user?.rol && ["ADMINISTRADOR"].includes(auth.user?.rol) && (
                                        <button onClick={() => handleDelete(cliente._id)} type="button" className="flex justify-center items-center">
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


