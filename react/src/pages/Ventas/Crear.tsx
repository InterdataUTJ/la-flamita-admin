import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import { useNavigate } from 'react-router';
import Template from "@/layout";
import { VentaRequest } from "@/services/Ventas/types";
import VentasService from "@/services/Ventas";
import ProductoService from "@/services/Productos";
import { ProductoResponse } from "@/services/Productos/types";


/*
Necesito manejar los productos de la venta.

1. Cree una variable de estado para manejar los productos de la venta.
2. Necesito crear una funcion para agregar productos a la venta y agregarlos a la variable de estado.
3. Necesito crear una funcion para eliminar productos de la venta y eliminarlos de la variable de estado.
4. Necesito crear una funcion para enviar los datos del formulario al servidor.

*/

export default function Ventacrear() {

    const navigate = useNavigate();
    const auth = useAuthContext();
    //Variable de estado para maenjar el formulario	
    const [loading, setLoading] = useState(false);

    //Variable de estado para manejar los productos de la venta
    const [productos, setProductos] = useState<{ [key: string]: number }[]>([]);

    //Variable de estado para manejar la lista de productos que obtenemos de la API
    // para luego mostrarlos en un select
    const [productosList, setProductosList] = useState<ProductoResponse[]>([]);

    useEffect(() => {
        if (!auth.token) return;
        //Aqui se puede hacer una peticion a la API para obtener los productos
        ProductoService.listar(auth.token).then((productos) => {
            setProductosList(productos);
        });

        //Aqui se inicializa con por lo menos un producto
        setProductos([{ "": 1 }]);

    }, [auth.token]);



    //Validamso que el usuario tenga el token
    if (!auth.token) return auth.goLogin;
    //Validamos si el usuario es administrador que lo deje crear un usuario
    if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE", "EMPLEADO"].includes(auth.user?.rol)) {
        return <p>Acceso denegado</p>;
    }


    //Manejar el envio de datos
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.token) return;
        if (loading) return;
        //Se pone en true para que no se pueda enviar el formulario varias veces
        setLoading(true);
        try {
            //Obtenemos los datos del formulario como objeto
            const formData = Object.fromEntries(new FormData(e.currentTarget));

            //Validamos que exista productos en el array de productos
            if (productos.length === 0) {
                alert("Debes añadir productos a la venta");
                setLoading(false);
                return;
            }


            const productosEnviar: { [key: string]: number } = {};

            productos.forEach(producto => {
                const id =  Object.keys(producto)[0] as string;
                if (!id || id.trim() === "") return;
                const cantidad = producto[id];
                productosEnviar[id] = cantidad;
            });

            const objData: VentaRequest = {
                productos : productosEnviar, // Envía el estado directamente
                metodo_pago: formData.metodo_pago as string,
            };

            console.log("Datos enviados al servidor", objData);

            //Aqui enviamos los datos al servidor, pasandole el token y el objeto de datos
            await VentasService.crear(auth.token, objData);
            navigate("/venta/listar", { replace: true });
        } catch (e: Error | unknown) {
            console.error(e);
        }
        setLoading(false);
    };



    //Aqui esta la funcion para agregar productos a la venta
    const handleAddProduct = () => {
        setProductos([...productos, { "": 1 }]);
    }

    const handleProductChange = (index: number, productId: string) => {
        const selectedProduct = productosList.find((p) => p._id === productId);
        if (selectedProduct) {
            const updatedProductos = [...productos];
            updatedProductos[index] = { [productId]: Object.values(updatedProductos[index])[0] || 1 }; // Mantén la cantidad actual o inicialízala en 1
            setProductos(updatedProductos);
        }
    };


    const handleEditValor = (index: number, cantidad: number) => {
        const updatedProductos = [...productos];
        const productId = Object.keys(updatedProductos[index])[0]; // Obtén el id del producto actual
        updatedProductos[index] = { [productId]: cantidad }; // Actualiza la cantidad
        setProductos(updatedProductos);
    };

    const handleDeleteProduct = (index: number) => {
        setProductos(productos.filter((_, i) => i !== index));
    }


    return (
        <Template title="Crear Venta">
            <h1>Crear venta</h1>

            <form onSubmit={handleSubmit}>
                <div id="producto-cantidad-contenedor" className="mb-5 flex flex-col gap-2">
                    {productos.map((producto, index) => {
                        const productId = Object.keys(producto)[0]; // Obtén el id del producto
                        const cantidad = Object.values(producto)[0]; // Obtén la cantidad del producto
                        const selectedProduct = productosList.find((p) => p._id === productId); // Busca el producto en la lista

                        return (
                            <div key={index} className="flex items-center gap-4">
                                {/* Selector de productos */}
                                <select
                                    value={productId}
                                    onChange={(e) => handleProductChange(index, e.target.value)}
                                    className="border p-2"
                                >
                                    <option value="">Selecciona un producto</option>
                                    {productosList.map((producto) => (
                                        <option key={producto._id} value={producto._id}>
                                            {producto.nombre}
                                        </option>
                                    ))}
                                </select>

                                {/* Campo para ingresar la cantidad */}
                                <Input
                                    type="number"
                                    min={1}
                                    value={String(cantidad)}
                                    onChange={(e) => handleEditValor(index, Number(e.target.value))}
                                    placeholder="Cantidad"
                                />

                                {/* Mostrar el precio calculado */}
                                <label>
                                    {selectedProduct
                                        ? `Total: $${selectedProduct.precio * cantidad}`
                                        : "Selecciona un producto"}
                                </label>

                                {/* Botón para eliminar el producto */}
                                <Button type="button" onClick={() => handleDeleteProduct(index)}>
                                    Eliminar
                                </Button>
                            </div>
                        );
                    })}
                </div>
                <div className="mb-4">
                    <label htmlFor="metodo_pago">Método de Pago:</label>
                    <select name="metodo_pago" id="metodo_pago" className="border p-2">
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                    </select>
                </div>

                {/* Botón para agregar un nuevo producto */}
                <Button type="button" onClick={handleAddProduct} className="margin-bottom mb-4">
                    Agregar Producto
                </Button>

                {/* Botón para enviar el formulario */}
                <Button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Crear Venta"}
                </Button>
            </form>
        </Template>
    )

};