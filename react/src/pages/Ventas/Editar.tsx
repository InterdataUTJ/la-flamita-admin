import { useEffect, useState } from "react";
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import { useNavigate, useParams } from 'react-router';
import Template from "@/layout";
import { VentaRequest } from "@/services/Ventas/types";
import VentaService from "@/services/Ventas";
import { VentaResponse } from "@/services/Ventas/types";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function VentaEditar() {

    const navigate = useNavigate();
    const auth = useAuthContext();
    const { id } = useParams();

    //Variable de estado para maenjar el formulario	
    const [loading, setLoading] = useState(false);

    const [Venta, setVenta] = useState<VentaResponse>({} as VentaResponse);

    //Aqui hacemos una peticion a la APi para listar la venta actual
    useEffect(() => {
        if (!auth.token || !id) return;
        //Aqui se puede hacer una peticion a la API para obtener las ventas
        VentaService.mostrar(auth.token, id)
            .then(venta => setVenta(venta))
            .catch(e => {
                if (e instanceof Error) alert(e.message);
                else alert("Ocurrio un error al obtener la venta");
            });

    }, [auth.token, id]);



    //Validamso que el usuario tenga el token
    if (!auth.token) return auth.goLogin;
    //Validamos si el usuario es administrador que lo deje crear un usuario
    if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE", "EMPLEADO"].includes(auth.user?.rol))
        return auth.goNotAllowed;


    //Manejar el envio de datos
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.token) return;
        if (loading) return;
        //Se pone en true para que no se pueda enviar el formulario varias veces
        setLoading(true);
        try {
            //Obtenemos los datos del formulario como objeto
            const formData = Object.fromEntries(new FormData(e.currentTarget));

            //Aqui creamos el objeto ventaRequest
            //Solo dejamos editar el metodo de pago 
            const ventaRequest: VentaRequest = {
                metodo_pago: formData.metodo_pago as string,
            };

            await VentaService.editar(auth.token, id as string, ventaRequest);
            navigate("/venta/listar", { replace: true });
        } catch (e: Error | unknown) {
            if (e instanceof Error) alert(e.message);
            else alert("Ocurrio un error al editar la venta");
        }
        setLoading(false);
    };


    //Aqui en la venta lo unico que dejamos editar es el formato de pago
    return (
        <Template title="Editar Venta">
            <h1 className="text-center font-extrabold text-3xl mb-8 mt-4">Editar Venta</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="mb-4">
                    <label htmlFor="metodo_pago" className="block mb-2 text-sm font-semibold text-gray-900">Método de Pago *</label>
                    <select name="metodo_pago" id="metodo_pago" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" >
                        <option value="EFECTIVO" selected={Venta.metodo_pago === "EFECTIVO"} >Efectivo</option>
                        <option value="TARJETA" selected={Venta.metodo_pago === "TARJETA"}>Tarjeta</option>
                    </select>
                </div>

                <div className="mb-4 space-y-4 p-4 border rounded shadow bg-white">
                    <h3 className="font-bold text-lg pb-1 border-b-2 border-primary-700">Productos asignados a la venta</h3>
                    <div className="space-y-2">
                        {Venta.productos?.map((producto) => (
                            <div key={producto._id} className="p-2 border-b border-gray-200">
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-base font-normal text-gray-500">Nombre:</p>
                                    <p className="text-base font-medium text-gray-900">{producto.producto_id.nombre}</p>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-base font-normal text-gray-500">Id del producto:</p>
                                    <p className="text-base font-medium text-gray-900">{producto.producto_id._id}</p>
                                </div>
                                <img
                                    src={producto.producto_id.fotos[0]}
                                    alt="Imagen del producto"
                                    className="h-12 rounded my-2"
                                />
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-base font-normal text-gray-500">Cantidad:</p>
                                    <p className="text-base font-medium text-gray-900">{producto.cantidad}</p>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-base font-normal text-gray-500">Precio:</p>
                                    <p className="text-base font-medium text-gray-900">${producto.precio}</p>
                                </div>
                                    {producto.descuento !== 0 && (
                                        <div className="flex flex-row items-center gap-2">
                                            <p className="text-base font-normal text-gray-500">Descuento:</p>
                                            <p className="text-base font-medium text-green-600">- {producto.descuento}%</p>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>


                <Button type="submit" disabled={loading}>
                    <IconDeviceFloppy />
                    Guardar venta
                </Button>
            </form>
        </Template>
    );
};