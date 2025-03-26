import Template from "@/layout";

export default function Error403Page() {
  return (
    <Template title="Error 403">
      <div className="mt-6 select-none">
        <p className="font-extrabold text-9xl text-center text-primary-500 mb-3">403</p>
        <p className="font-bold text-3xl text-center text-primary-500">Acceso denegado</p>
      </div>
    </Template>
  );
}