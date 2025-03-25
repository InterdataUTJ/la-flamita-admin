
import { useEffect, useState } from "react";
import useAuthContext from "@/hooks/AuthContext/hook";
import { useParams } from 'react-router';
import Template from "@/layout";
import VentaService from "@/services/Ventas";
import { VentaResponse } from "@/services/Ventas/types";



export default function VentaListar() {
    //El auth para ver que este autenticado el usuario 
    const auth = useAuthContext();
    const { id } = useParams();

    //Variable de estado para la venta mediante su id
    const [Venta, setVenta] = useState<VentaResponse>({} as VentaResponse);


    //Aqui hacemos una peticion a la APi para listar la venta actual
    useEffect(() => {
        if (!auth.token || !id) return;
        //Aqui se puede hacer una peticion a la API para obtener las venta correspondiente al ID
        VentaService.mostrar(auth.token, id).then((venta) => {
            setVenta(venta);
        });
    }, [auth.token, id]);

    //Listamos los datos de la venta
    return (
        <Template>
            <h2 className="font-bold text-3xl mb-3">Venta #{Venta._id}</h2>

            <div>
                <h4>Id del Empleado: </h4>
                {Venta.empleado_id}
            </div>

            <br />

            <div className="space-y-4 p-4 border rounded shadow bg-white my-5">
                <h3 className="font-bold text-lg pb-1 border-b-2 border-primary-700">Resumen</h3>
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">Estado de la venta</dt>
                        <dd className="text-base font-medium text-gray-900">{Venta.estado}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">Fecha de la venta</dt>
                        <dd className="text-base font-medium text-gray-900">{Venta.fecha_venta}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">Fecha de pago</dt>
                        <dd className="text-base font-medium text-gray-900">{Venta.fecha_pago}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">Método de pago</dt>
                        <dd className="text-base font-medium text-gray-900">{Venta.metodo_pago}</dd>
                    </dl>
                </div>
            </div>

            <div className="space-y-4 p-4 border rounded shadow bg-white my-5">
                <h3 className="font-bold text-lg pb-1 border-b-2 border-primary-700">Productos asignados a la venta</h3>
                <div className="space-y-2">
                    {Venta.productos?.map((producto) => (
                        <div key={producto._id} className="p-2 border-b border-gray-200">
                            <p className="text-base font-normal text-gray-500">Nombre:</p>
                            <p className="text-base font-medium text-gray-900">{producto.producto_id.nombre}</p>
                            <p className="text-base font-normal text-gray-500">Id del producto:</p>
                            <p className="text-base font-medium text-gray-900">{producto.producto_id._id}</p>
                            <img
                                src={producto.producto_id.fotos[0]}
                                alt="Imagen del producto"
                                className="h-12 rounded my-2"
                            />
                            <p className="text-base font-normal text-gray-500">Cantidad:</p>
                            <p className="text-base font-medium text-gray-900">{producto.cantidad}</p>
                            <p className="text-base font-normal text-gray-500">Precio:</p>
                            <p className="text-base font-medium text-gray-900">${producto.precio}</p>
                            <p className="text-base font-normal text-gray-500">Descuento:</p>
                            <p className="text-base font-medium text-green-600">-${producto.descuento}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4 p-4 border rounded shadow bg-white my-5">
                <h3 className="font-bold text-lg pb-1 border-b-2 border-primary-700">Total de la venta</h3>
                <div className="space-y-2">
                    {(() => {
                        let total = Venta.productos?.reduce((total, producto) => {
                            return total + producto.precio * producto.cantidad - producto.descuento;
                        }, 0) || 0;
                        return (
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-bold text-gray-900">Total:</dt>
                                <dd className="text-base font-bold text-gray-900">${total.toFixed(2)}</dd>
                            </dl>
                        );
                    })()}
                </div>
            </div>

        </Template >
    );





}