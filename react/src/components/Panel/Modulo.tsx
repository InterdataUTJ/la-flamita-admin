import { Link } from "react-router";
import Button from "@/components/Button";
import { Share } from "@/components/Icon";

export enum Permiso {
  Administrador = "ADMINISTRADOR",
  Gerente = "GERENTE",
  Empleado = "EMPLEADO",
}

interface ModuloProps {
  module: string;
  link: string;
  rol?: string;
  permisos?: {
    base?: string[];
    listar?: string[];
    mostrar?: string[];
    crear?: string[];
    editar?: string[];
    borrar?: string[];
  }
}

const fullPermiso = ["ADMINISTRADOR", "GERENTE", "EMPLEADO"];
const defaultPermisos = {
  base: fullPermiso,
  listar: fullPermiso,
  mostrar: fullPermiso,
  crear: fullPermiso,
  editar: fullPermiso,
  borrar: fullPermiso,
};

export default function Modulo({ module, link, rol = "EMPLEADO", permisos = defaultPermisos }: ModuloProps) {
  const currPer = { ...defaultPermisos, ...permisos };
  if (!currPer.base.includes(rol)) return null;
  const title = module.charAt(0).toUpperCase() + module.slice(1).toLowerCase();
  const name = module.toLowerCase();
  
  return (
    <div className="bg-white grow rounded shadow p-4 min-w-64 flex flex-col">
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="mb-1">Tienes permiso para:</p>
      <ol className="list-decimal pl-7 text-sm grow mb-2">
        { currPer.listar.includes(rol) && <li>Listar {name}</li> }
        { currPer.mostrar.includes(rol) && <li>Mostrar {name}</li> }
        { currPer.crear.includes(rol) && <li>Crear {name}</li> }
        { currPer.editar.includes(rol) && <li>Editar {name}</li> }
        { currPer.borrar.includes(rol) && <li>Borrar {name}</li> }
      </ol>
      <Button as={Link} to={link}>
        <Share />
        Ir
      </Button>
    </div>
  );
}
