<h1 align="center">
  <img src="./public/images/la-flamita-web.svg" alt="la-flamita-web" width="200">
  <br>
  La Flamita Web
  <br>
  <br>
</h1>

<p align="center">
  <a href="https://laravel.com/"><img src="https://img.shields.io/badge/Built_using-Laravel-red.svg?logo=laravel" alt="laravel"></a>
  <a href="https://laravel.com/docs/10.x"><img src="https://img.shields.io/badge/Laravel-10.x-red.svg?logo=laravel" alt="laravel-version"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Made_with-Tailwind-blue.svg?logo=tailwindcss" alt="tailwindcss"></a>
  <a href="https://flowbite.com/"><img src="https://img.shields.io/badge/Using-Flowbite-blue.svg" alt="flowbite"></a>
</p>

> [!NOTE]
> Este es un `submodule` que forma parte del proyecto [`la-flamita`](https://github.com/InterdataUTJ/la-flamita/).

Desarrollo Web de [`Laravel`](https://laravel.com/docs/10.x) para taquería la flamita. La solución se enfoca en desarrollar toda la infraestructura web (vistas y APIs) para la logica de negocios de `la-flamita`.

## Documentación 📕

### Roles de acceso 👑

1. **Administrador** (_Tiene acceso completo a todos los modulos de la web_)👑
2. **Gerente** (_Tiene acceso completo excepto clientes, donde solo puede ver_)🦸
3. **Empleado** (_Tiene acceso solo para ver los modulo de productos y clientes, y acceso total a ventas, excepto eliminar_)👨‍🍳
4. **Cliente** (_Solo ver peril y hacer compras_)

### Modulos del sistema 🧩

- Clientes 🙂
- Empleados 💁‍♂️
- Ventas 💰
- Productos 🌮
- Categorias 📁
- Carrito 🛒
- Sensores IoT🔌

### Modulo de Empleado

- `GET /empleado/login` 
- `POST /empleado/logout`
-

### Modulo de Cliente

- `GET /cliente/login` 
- `POST /cliente/logout`
- :
### Modulo de Ventas

### Modulo de Producto

### Categoria 

### Carrito

### Sensores de IoT