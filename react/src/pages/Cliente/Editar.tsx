import ClienteService from '@/services/Clientes';
import { useState, useEffect} from 'react';
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import { useNavigate, useParams } from 'react-router';
import Input from '@/components/Input';
import File from '@/components/Input/File'
import { IconPencilPlus } from '@tabler/icons-react';
import { ClienteRequest, ClienteResponse } from '@/services/Clientes/types';

export default function ClienteEditar() {

    const navigate = useNavigate();
    const { id } = useParams();
    const auth = useAuthContext();
    const [cliente, setCliente] = useState<ClienteResponse>({} as ClienteResponse);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (!auth.token) return;
        if (loading) return;
        setLoading(true);
        try {

            //Creo una variable para manejar el envio de datos
            const formData = Object.fromEntries(new FormData(e.currentTarget));
            const toSend = {} as ClienteRequest;
            if (formData.clave !== formData.clave2) {
                alert("Las contraseñas no coinciden")
                return setLoading(false);
            }

            if (formData.nombre && formData.nombre !== cliente.nombre) toSend.nombre = formData.nombre as string;
            if (formData.apellido && formData.apellido !== cliente.apellido) toSend.apellido = formData.apellido as string;
            if (formData.correo && formData.correo !== cliente.correo) toSend.correo = formData.correo as string;
            if (formData.clave && formData.clave2 && formData.clave === formData.clave2) toSend.clave = formData.clave as string;
            if (formData.avatar && (formData.avatar as File).name !== "") toSend.avatar = formData.avatar as File;

            await ClienteService.editar(auth.token, cliente._id, toSend);
            navigate("/cliente/listar", { replace: true });






        } catch (e: Error | unknown) { console.error(e) }

    }


    return (
        <Template title="Editar cliente">
            <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">Editar cliente</h2>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>

                    <Input
                        label="nombre"
                        name="nombre"
                        placeholder="nombre"
                        required
                        minLength={3}
                        maxLength={50}
                        defaultValue={cliente.nombre}
                    />

                    <Input
                        label="apellido"
                        name="apellido"
                        placeholder="apellido"
                        required
                        minLength={3}
                        maxLength={50}
                        defaultValue={cliente.apellido}
                    />

                    <Input
                        type="email"
                        label="Correo"
                        name="correo"
                        placeholder="Correo"
                        required
                        defaultValue={cliente.correo}
                    />

                    <Input
                        type="password"
                        label="Contraseña"
                        name="clave"
                        placeholder="Contraseña"
                        minLength={8}
                        maxLength={50}
                    />

                    <Input
                        type="password"
                        label="Repetir contraseña"
                        name="clave2"
                        placeholder="Contraseña"
                        minLength={8}
                        maxLength={50}
                    />

                    <File
                        name="avatar"
                        label="avatar"
                        description="Selecciona tu avatar"
                    />

                    <Button type='submit' loading={loading}>
                        <IconPencilPlus />

                    </Button>
                </form>
            </div>
        </Template>

    );

}