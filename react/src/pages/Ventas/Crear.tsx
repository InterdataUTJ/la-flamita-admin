import { useEffect, useState } from "react";
import Button from "@/components/Button";
import useAuthContext from "@/hooks/AuthContext/hook";
import { useNavigate } from 'react-router';
import Template from "@/layout";
import { VentaRequest } from "@/services/Ventas/types";
import VentasService from "@/services/Ventas";
import ProductoService from "@/services/Productos";
import { ProductoResponse } from "@/services/Productos/types";
import { IconPencilPlus, IconPlus, IconTrash } from "@tabler/icons-react";


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
        ProductoService.listar(auth.token)
            .then(productos => setProductosList(productos))
            .catch(e => {
                if (e instanceof Error) alert(e.message);
                else alert("Ha ocurrido un error al obtener los productos");
                navigate("/venta/listar", { replace: true });
            });

        //Aqui se inicializa con por lo menos un producto
        setProductos([{ "": 1 }]);

    }, [auth.token]);



    //Validamso que el usuario tenga el token
    if (!auth.token) return auth.goLogin;
    //Validamos si el usuario es administrador que lo deje crear un usuario
    if (!auth.user?.rol || !["ADMINISTRADOR", "GERENTE", "EMPLEADO"].includes(auth.user?.rol)) {
        return auth.goNotAllowed;
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

            for(const producto of productos){
                const id =  Object.keys(producto)[0] as string;
                if (!id || id.trim() === ""){
                    alert("Debes seleccionar un producto");
                    setLoading(false);
                    return;
                } 
                const cantidad = producto[id];
                productosEnviar[id] = cantidad;
            }

            const objData: VentaRequest = {
                productos : productosEnviar, // Envía el estado directamente
                metodo_pago: formData.metodo_pago as string,
            };

            //Aqui enviamos los datos al servidor, pasandole el token y el objeto de datos
            await VentasService.crear(auth.token, objData);
            navigate("/venta/listar", { replace: true });
        } catch (e: Error | unknown) {
            if (e instanceof Error) alert(e.message);
            else alert("Ha ocurrido un error al crear la venta");
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
            <h2 className="text-center font-extrabold text-3xl mb-8 mt-4">Crear Venta</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="metodo_pago" className="block mb-2 text-sm font-semibold text-gray-900">Método de Pago *</label>
                    <select name="metodo_pago" id="metodo_pago" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" >
                        <option value="EFECTIVO">Efectivo</option>
                        <option value="TARJETA">Tarjeta</option>
                    </select>
                </div>

                <h3 className="font-bold text-2xl mt-8 mb-5 pb-4 border-b-2 border-quinary-700">Productos</h3>

                <div id="producto-cantidad-contenedor" className="mb-5 flex flex-col gap-2">
                    {productos.map((producto, index) => {
                        const productId = Object.keys(producto)[0]; // Obtén el id del producto
                        const cantidad = Object.values(producto)[0]; // Obtén la cantidad del producto
                        const selectedProduct = productosList.find((p) => p._id === productId); // Busca el producto en la lista

                        return (
                            <div key={index} className="flex gap-3">
                                {/* Selector de productos */}
                                <div className="relative z-0 w-full grow mb-2 group">
                                    <select
                                        value={productId}
                                        onChange={(e) => handleProductChange(index, e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    >
                                        <option value="">Selecciona un producto</option>
                                        {productosList.map((producto) => (
                                            <option key={producto._id} value={producto._id}>
                                                {producto.nombre} - ${producto.precio}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Campo para ingresar la cantidad */}
                                <div className="relative z-0 grow-0 mb-5 group">
                                    <input 
                                        type="number"
                                        min={1}
                                        value={cantidad}
                                        onChange={(e) => handleEditValor(index, Number(e.target.value))}
                                        placeholder="Cantidad"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    />
                                </div>

                                {/* Mostrar el precio calculado */}
                                <label>
                                    {selectedProduct
                                        ? <span><b>Total:</b><br /> ${selectedProduct.precio * cantidad}</span>
                                        : "Selecciona un producto"}
                                </label>

                                {/* Botón para eliminar el producto */}
                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteProduct(index)}
                                    className="bg-secondary-600 hover:bg-secondary-500 active:bg-secondary-700relative z-0 grow-0 mb-5 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    <IconTrash />
                                </button>
                            </div>
                        );
                    })}

                    {/* Botón para agregar un nuevo producto */}
                    <Button type="button" onClick={handleAddProduct} className="mb-4" color="tertiary">
                        <IconPlus />
                        Agregar Producto
                    </Button>
                </div>


                {/* Botón para enviar el formulario */}
                <Button type="submit" loading={loading}>
                    <IconPencilPlus />
                    Crear Venta
                </Button>
            </form>
        </Template>
    )

};