
import ClienteService from '@/services/Clientes';
import { useState } from 'react';
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import { useNavigate } from 'react-router';
import Input from '@/components/Input';
import File from '@/components/Input/File'
import {  IconPencilPlus } from '@tabler/icons-react';



export default function ClienteCrear(){
    const navigate = useNavigate();
    const auth = useAuthContext();
    //Manejar el estado del formulario
    const [loading, setloading] = useState(false);


    //Validamos que el usuario tenga el toke.
    if (!auth.token) return auth.goLogin;
    //Validamos si el usuario es administrador que lo deje crear un usuario
    if (!auth.user?.rol || auth.user?.rol !== "ADMINISTRADOR") return auth.goNotAllowed;

    //Creo una variable para manejar el envio de datos
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.token) return;
        if (loading) return;
        setloading(true);

        try {
            const formData = Object.fromEntries(new FormData(e.currentTarget));
            if (formData.clave !== formData.clave2) {
                alert("Las contraseñas no coinciden")
                return setloading(false);
            }

            await ClienteService.crear(auth.token, formData);
            //Mandamos al usuario a clientes listar
            navigate("/cliente/listar", { replace: true });
        } catch (e: Error | unknown) { 
            if (e instanceof Error) alert(e.message);
            else alert("Ocurrio un error al crear el cliente");
        }

    }

    return (
        <Template title="Crear cliente">
            <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">Crear cliente</h2>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>

                    <Input
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre"
                        required
                        minLength={3}
                        maxLength={50}
                    />

                    <Input
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido"
                        required
                        minLength={3}
                        maxLength={50}
                    />

                    <Input
                        type="email"
                        label="Correo"
                        name="correo"
                        placeholder="Correo"
                        required
                    />

                    <Input
                        type="password"
                        label="Contraseña"
                        name="clave"
                        placeholder="Contraseña"
                        minLength={8}
                        maxLength={50}
                        required
                    />

                    <Input
                        type="password"
                        label="Repetir contraseña"
                        name="clave2"
                        placeholder="Contraseña"
                        minLength={8}
                        maxLength={50}
                        required
                    />

                    <File
                        name="avatar"
                        label="Avatar"
                        description="Selecciona tu avatar"
                    />

                    <Button type='submit'loading ={loading}>
                        <IconPencilPlus />
                        Crear cliente
                    </Button>
                </form>
            </div>
        </Template>






    );





}