function crearElementoProducto(clientes) {
  // Crear el contenedor principal
  const containerDiv = document.createElement('div');
  containerDiv.className = 'flex gap-3';

  // Crear el div del select Producto
  const productoDiv = document.createElement('div');
  productoDiv.className = 'relative z-0 w-full grow mb-2 group';

  const productoSelect = document.createElement('select');
  productoSelect.name = 'productos[]';
  productoSelect.className = 'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5';

  // Llenar el select con opciones basadas en los datos de clientes
  clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = cliente.nombre;
      productoSelect.appendChild(option);
  });

  productoDiv.appendChild(productoSelect);

  // Crear el div para el campo Cantidad
  const cantidadDiv = document.createElement('div');
  cantidadDiv.className = 'relative z-0 grow-0 mb-5 group';

  const cantidadInput = document.createElement('input');
  cantidadInput.type = 'number';
  cantidadInput.name = 'cantidad[]';
  cantidadInput.value = '1';
  cantidadInput.step = '1';
  cantidadInput.className = 'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5';

  cantidadDiv.appendChild(cantidadInput);

  // Crear el botón de eliminar
  const eliminarButton = document.createElement('button');
  eliminarButton.type = 'button';
  eliminarButton.className = 'relative z-0 grow-0 mb-5 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center';
  eliminarButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // Añadir evento para eliminar este elemento
  eliminarButton.onclick = function () {
      containerDiv.remove();
  };

  // Añadir todo al contenedor principal
  containerDiv.appendChild(productoDiv);
  containerDiv.appendChild(cantidadDiv);
  containerDiv.appendChild(eliminarButton);

  return containerDiv;
}

function agregarProducto(clientes) {
  const productosContainer = document.getElementById('productos-container');
  productosContainer.appendChild(crearElementoProducto(clientes));
}

window.agregarProducto = agregarProducto;