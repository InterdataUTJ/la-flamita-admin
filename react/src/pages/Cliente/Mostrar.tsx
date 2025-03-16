import ClienteService from '@/services/Clientes';
import { useState, useEffect } from 'react';
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import { useParams } from 'react-router';
import Input from '@/components/Input';
import { ClienteResponse } from '@/services/Clientes/types';

export default function ClienteEditar() {
    
    const { id } = useParams();
    const auth = useAuthContext();
    const [cliente, setCliente] = useState<ClienteResponse>({} as ClienteResponse);

    //Aqui se hace la peticion para editar el cliente
    useEffect(() => {
        if (!auth.token || !id) return;
        ClienteService.mostrar(auth.token, id).then((cliente) => {
            setCliente(cliente);
        });
    }, [auth.token, id]);


    //Validamos que el usuario tenga el toke.
    if (!auth.token) return auth.goLogin;
    //Validamos si el usuario es administrador que lo deje crear un usuario
    if (!auth.user?.rol || auth.user?.rol !== "ADMINISTRADOR") {
        window.alert("Acceso no permitido")
        return
    };


    return (
        <Template title="Editar cliente">
            <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">Editar cliente</h2>
            <div className="mt-4">
                <form>

                    <Input
                        label="nombre"
                        name="nombre"
                        placeholder="nombre"
                        required
                        minLength={3}
                        maxLength={4}
                        defaultValue={cliente.nombre}
                        disabled
                    />

                    <Input
                        label="apellido"
                        name="apellido"
                        placeholder="apellido"
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                    <img className="w-20 h-20 rounded-full object-cover" src={cliente.avatar} alt="Avatar" />
                    </div>
                </form>
            </div>
        </Template>

    );

}