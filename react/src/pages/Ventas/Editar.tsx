import { useEffect, useState } from "react";
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import { useNavigate, useParams } from 'react-router';
import Template from "@/layout";
import { VentaRequest } from "@/services/Ventas/types";
import VentaService from "@/services/Ventas";
import { VentaResponse } from "@/services/Ventas/types";

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
        VentaService.mostrar(auth.token, id).then((venta) => {
            setVenta(venta);
        });

    }, [auth.token, id]);



    //Validamso que el usuario tenga el token
    if (!auth.token) return auth.goLogin;
    //Validamos si el usuario es administrador que lo deje crear un usuario
    if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE", "EMPLEADO"].includes(auth.user?.rol)) {
        return <p>Acceso denegado</p>;
    }


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
            console.error(e);
        }
        setLoading(false);
    };


    //Aqui en la venta lo unico que dejamos editar es el formato de pago
    return (
        <Template title="Editar Venta">
            <h1>Editar Venta</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <h1>Cambiar metodo de pago</h1>
                <div className="mb-4">
                    <label htmlFor="metodo_pago">Método de Pago:</label>
                    <select name="metodo_pago" id="metodo_pago" className="border p-2" >
                        {
                            Venta.metodo_pago === "EFECTIVO" ? 
                            <>
                                <option value="EFECTIVO" >Efectivo</option>
                                <option value="TARJETA" >Tarjeta</option>
                            </> : 
                            <>
                                <option value="TARJETA" selected>Tarjeta</option>
                                <option value="EFECTIVO" >Efectivo</option>
                            </>
                        }
                    </select>
                </div>

                <Button type="submit" disabled={loading}>Guardar</Button>
            </form>
        </Template>
    );
};