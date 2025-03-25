import {
    IconPencilPlus,
    IconPencilCog,
    IconEye,
    IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import { Link } from 'react-router';
import Template from "@/layout";
import VentaService from "@/services/Ventas";
import { VentaResponse } from "@/services/Ventas/types";


export default function VentaListar() {
    const auth = useAuthContext();

    //Variable de estado para manejar las ventas
    const [ventas, setVentas] = useState<VentaResponse[]>([]);

    //Mediante el hook useEffect se obtienen las ventas de la APi
    useEffect(() => {
        if (!auth.token) return;
        VentaService.listar(auth.token).then((ventas) =>
            setVentas(ventas)
        );
    }, [auth.token]);

    const handleDelete = (id: string) => {
        if (!auth.token) return;
        if (!auth.user?.rol || (auth.user?.rol !== "ADMINISTRADOR" && auth.user?.rol !== "GERENTE")) return window.alert("Acceso no permitido");
        if (!window.confirm("Seguro que quieres eliminar esta venta?")) return;
        VentaService.eliminar(auth.token, id).then(() => {
            setVentas(ventas.filter((venta) => venta._id !== id));
        });
    };


    return (
        <Template>
            <Button as={Link} to="/venta/crear">
                <IconPencilPlus />
                Crear Venta
            </Button>
            <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="text-center px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Fecha de la venta
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Fecha de pago
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Productos
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Empleado_id
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Metodo de pago
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta, idx) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {idx + 1}
                                </th>
                                <td className="px-6 py-4">
                                    <img
                                        src={venta.estado}
                                        alt="imagen"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <th
                                    scope="row"
                                    className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {venta.fecha_venta}
                                </th>
                                <td className="text-center px-6 py-4">{venta.fecha_pago}</td>

                                <td className="text-center px-6 py-4">{venta.empleado_id}</td>
                                <td className="text-center px-6 py-4">{venta.metodo_pago}</td>
                                <td className="text-center px-6 py-4">{venta.estado}</td>

                                <td className="text-center px-6 py-4 flex gap-4 justify-center items-center">
                                    <Link to={`/venta/editar/${venta._id}`} className="flex justify-center items-center">
                                        <IconPencilCog className="text-quinary-500 hover:scale-105 cursor-pointer" />
                                    </Link>
                                    <Link to={`/venta/mostrar/${venta._id}`} className="flex justify-center items-center">
                                        <IconEye className="text-quaternary-500 hover:scale-105 cursor-pointer" />
                                    </Link>
                                    {(auth.user?.rol === "ADMINISTRADOR" || auth.user?.rol === "GERENTE") && (
                                        <button onClick={() => handleDelete(venta._id)} type="button" className="flex justify-center items-center">
                                            <IconTrash className="hover:scale-105 text-primary-700 cursor-pointer" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Template >
    );





}