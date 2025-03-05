import { useAuthContext } from "@/hooks/AuthContext";
import Template from "@/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PanelPage() {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, []);

  return (
    <Template title="Panel" auth>
      Hola
    </Template>
  );
}