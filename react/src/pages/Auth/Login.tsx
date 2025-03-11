import { useRef } from "react";
import { useNavigate } from "react-router";
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import Input from "@/components/Input";
import { User } from "@/components/Icon";


export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const correoRef = useRef<HTMLInputElement>(null);
  const claveRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correoRef.current || !claveRef.current) return;

    try {
      await auth.login(correoRef.current.value, claveRef.current.value);
      navigate("/panel", { replace: true });
    } catch (e) {
      if (e instanceof Error) alert(e.message);
      else alert('Ocurrió un error inesperado');
    }
  };

  return (
    <Template title="Iniciar sesión">

      <h1 className="pt-5 mb-5 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Iniciar sesión
      </h1>

      <form onSubmit={handleLogin}>
        <Input
          label="Correo electrónico"
          name="correo"
          type="email"
          ref={correoRef}
          required
        />

        <Input 
          type="password"
          label="Contraseña" 
          name="password" 
          ref={claveRef}
          minLength={8}
          maxLength={50}
          required
        />

        <button
          type="submit"
          className="w-full font-bold rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2 hover:bg-gray-100 active:bg-gray-200 text-white bg-primary-600 hover:bg-primary-500 active:bg-primary-700"
        >
          <User /> Iniciar sesión
        </button>
      </form>
    </Template>
  );
}
