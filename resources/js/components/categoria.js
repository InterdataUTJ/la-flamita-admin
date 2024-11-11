function CategoriaValor() {
  const container = document.createElement('div');
  container.className = 'flex';

  // Crear el input
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'valores[]';
  input.className = 'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5';
  input.placeholder = 'Nombre';
  input.required = true;
  input.minLength = 3;
  input.maxLength = 50;

  // Crear el botón
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'bg-secondary-600 hover:bg-secondary-500 active:bg-secondary-700 px-4 rounded-r-lg text-white';
  button.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  button.onclick = function() {
      container.remove();
  };

  // Añadir input y botón al contenedor
  container.appendChild(input);
  container.appendChild(button);

  return container;
}

function crearCategoriaValor() {
  document.getElementById('categoria-valores-contenedor').appendChild(CategoriaValor());
}

window.CategoriaValor = CategoriaValor;
window.crearCategoriaValor = crearCategoriaValor;