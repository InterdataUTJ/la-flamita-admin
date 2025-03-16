import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import Modulo, { Permiso } from "@/components/Panel/Modulo";

export default function PanelPage() {
  const auth = useAuthContext();
  if (!auth.token) return auth.goLogin;
  
  return (
    <Template title="Panel">
      <h2 className="text-center font-extrabold text-3xl mb-8">Panel de Control</h2>
      <div className="flex flex-col gap-4">

        <h2 className="font-bold text-2xl mb-2 pb-4 border-b-2 border-quinary-700">Módulos</h2>
        <div className="flex gap-4 flex-wrap w-full">

          <Modulo 
            module="Empleados" 
            link="/empleado/listar"
            rol={auth.user?.rol}
            permisos={{
              base: [Permiso.Administrador, Permiso.Gerente],
              listar: [Permiso.Administrador, Permiso.Gerente],
              mostrar: [Permiso.Administrador, Permiso.Gerente],
              crear: [Permiso.Administrador, Permiso.Gerente],
              editar: [Permiso.Administrador, Permiso.Gerente],
              borrar: [Permiso.Administrador],
            }}
          />

          <Modulo 
            module="Clientes" 
            link="/cliente/listar"
            rol={auth.user?.rol}
            permisos={{
              crear: [Permiso.Administrador],
              editar: [Permiso.Administrador],
              borrar: [Permiso.Administrador],
            }}
          />

          <Modulo 
            module="Categorías" 
            link="/categoria/listar"
            rol={auth.user?.rol}
            permisos={{
              crear: [Permiso.Administrador, Permiso.Gerente],
              editar: [Permiso.Administrador, Permiso.Gerente],
              borrar: [Permiso.Administrador, Permiso.Gerente],
            }}
          />

          <Modulo 
            module="Productos" 
            link="/producto/listar"
            rol={auth.user?.rol}
            permisos={{
              crear: [Permiso.Administrador, Permiso.Gerente],
              editar: [Permiso.Administrador, Permiso.Gerente],
              borrar: [Permiso.Administrador, Permiso.Gerente],
            }}
          />

          <Modulo 
            module="Sensores" 
            link="/sensor/listar"
            rol={auth.user?.rol}
            permisos={{
              base: [Permiso.Administrador, Permiso.Gerente],
            }}
          />

          <Modulo 
            module="Ventas" 
            link="/venta/listar"
            rol={auth.user?.rol}
            permisos={{
              borrar: [Permiso.Administrador, Permiso.Gerente],
            }}
          />


        </div>

        <h2 className="font-bold text-2xl mt-5 mb-2 pb-4 border-b-2 border-quinary-700">Sensores</h2>
        <div className="flex gap-4 flex-wrap justify-center items-center w-full">
          SENSOR
        </div>

      </div>
    </Template>
  );
}