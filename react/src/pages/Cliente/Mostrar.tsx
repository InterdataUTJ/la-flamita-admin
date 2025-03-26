import ClienteService from '@/services/Clientes';
import { useState, useEffect } from 'react';
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import { useNavigate, useParams } from 'react-router';
import Input from '@/components/Input';
import { ClienteResponse } from '@/services/Clientes/types';

export default function ClienteEditar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const auth = useAuthContext();
    const [cliente, setCliente] = useState<ClienteResponse>({} as ClienteResponse);

    //Aqui se hace la peticion para editar el cliente
    useEffect(() => {
        if (!auth.token || !id) return;
        ClienteService.mostrar(auth.token, id)
            .then((cliente) => {
                setCliente(cliente);
            })
            .catch((error) => {
                if (error instanceof Error) alert(error.message);
                else alert("Ha ocurrido un error al obtener el cliente");
                navigate("/cliente/listar", { replace: true });
            });
    }, [auth.token, id]);


    //Validamos que el usuario tenga el toke.
    if (!auth.token) return auth.goLogin;
    //Validamos si el usuario es administrador que lo deje crear un usuario
    if (!auth.user?.rol || auth.user?.rol !== "ADMINISTRADOR") return auth.goNotAllowed;


    return (
        <Template title="Mostrar cliente">
            <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">Mostrar cliente</h2>
            <div className="mt-4">
                <form>

                    <Input
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre"
                        required
                        minLength={3}
                        maxLength={50}
                        defaultValue={cliente.nombre}
                        disabled
                    />

                    <Input
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido"
                        required
                        minLength={3}
                        maxLength={50}
                        defaultValue={cliente.apellido}
                        disabled
                    />

                    <Input
                        type="email"
                        label="Correo"
                        name="correo"
                        placeholder="Correo"
                        required
                        defaultValue={cliente.correo}
                        disabled
                    />
                    <div className='mb-5'>
                        <label htmlFor='' className="block mb-2 text-sm font-semibold text-gray-900">Avatar</label>
                        <img className="w-20 h-20 rounded-full object-cover" src={cliente.avatar} alt={cliente._id} />
                    </div>
                </form>
            </div>
        </Template>

    );

}