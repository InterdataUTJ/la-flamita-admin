
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
    if (!auth.user?.rol || auth.user?.rol !== "ADMINISTRADOR") {
        window.alert("Acceso no permitido")
        return 
    };

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
        } catch (e: Error | unknown) { console.error(e) }

    }

    return (
        <Template title="crear cliente">
            <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">Crear cliente</h2>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>

                    <Input
                        label="nombre"
                        name="nombre"
                        placeholder="nombre"
                        required
                        minLength={3}
                        maxLength={4}
                    />

                    <Input
                        label="apellido"
                        name="apellido"
                        placeholder="apellido"
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
                    name = "avatar"
                    label = "avatar"
                    description = "Selecciona tu avatar"
                    />

                    <Button type='submit'loading ={loading}>
                        <IconPencilPlus />

                    </Button>
                </form>
            </div>
        </Template>






    );





}