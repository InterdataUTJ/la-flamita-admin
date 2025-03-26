import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import Input from "@/components/Input";
import { User } from "@/components/Icon";
import Button from "@/components/Button";


export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  const correoRef = useRef<HTMLInputElement>(null);
  const claveRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correoRef.current || !claveRef.current) return;
    setLoading(true);

    try {
      await auth.login(correoRef.current.value, claveRef.current.value);
      navigate("/panel", { replace: true });
    } catch (e) {
      if (e instanceof Error) alert(e.message);
      else alert('Error al iniciar sesión');
    }

    setLoading(false);
  };

  return (
    <Template title="Iniciar sesión">

      <h1 className="pt-5 mb-5 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Iniciar sesión
      </h1>

      <form onSubmit={handleLogin}>
        <Input
          label="Correo electrónico"
          placeholder="example@laflamita.live"
          name="correo"
          type="email"
          ref={correoRef}
          required
        />

        <Input 
          type="password"
          placeholder="********"
          label="Contraseña" 
          name="password" 
          ref={claveRef}
          minLength={8}
          maxLength={50}
          required
        />

        <Button
          type="submit"
          loading={loading}
        >
          <User /> Iniciar sesión
        </Button>
      </form>
    </Template>
  );
}
