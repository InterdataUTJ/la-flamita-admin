<h1 align="center">
  <img src="./public/images/la-flamita-web.svg" alt="la-flamita-web" width="200">
  <br>
  La Flamita Admin
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

> [!IMPORTANT]
> Este proyecto solo representa el área administrativa. Puedes consultar el área del cliente desde el repositorio [`la-flamita-cliente`](https://github.com/InterdataUTJ/la-flamita-cliente/).

Desarrollo Web área administrativa de [`Laravel`](https://laravel.com/docs/10.x) para taquería la flamita. La solución se enfoca en desarrollar toda la infraestructura web (vistas y APIs) para la logica de negocios de `la-flamita`.

## Documentación 📕

### Como levantar el entono de desarrollo

1. Primero debes de asegurarte de contar con los requisitos minimos:

  - [`PHP`](https://www.php.net/releases/8.1/es.php) mínimo versión 8.1
  - [`Composer`](https://getcomposer.org/), recomendamos la ultima versión, 2.8.2.
  - [`MySQL`](https://www.mysql.com/) (_recomendamos cumplir con esta dependencia y PHP mediante [`XAMPP`](https://www.apachefriends.org/es/index.html), [`WAMP`](https://www.wampserver.com/en/) o algun software similar_).
  - [`NodeJS`](https://nodejs.org/en/) minimo versión 18 LTS (_con su respectiva instalación de [`npm`](https://www.npmjs.com/), el cual se incluye por defecto con node_).

2. Clonar el repositorio (_asegurate de tener acceso al repositorio_).

```bash
git clone https://github.com/InterdataUTJ/la-flamita-admin.git
```

3. Navegar al directorio del repositorio

```bash
cd la-flamita-admin/
```

4. Configurar las variables de entorno. 

_Ya deberia de estar bien configurado, pero asegurate de que las variables relacionadas a la base de datos sean correctas._


5. Instalar dependencias.

```bash
# Dependencias relacionadas a laravel y PHP
composer install

# Dependencias relacionadas a nodejs (tailwind, flowbite y fontawesome).
npm install
```

6. Arrancar la base de datos.

_Este proceso dependera de la instalación de BD a elegir, es completamente independiente del proyecto. El unico requisito adicional es crear la base de datos con el mismo nombre de las variables de entorno (No es necesario crear tablas manualmente)._

7. Ejecutar configuración de laravel mediante `artisan`.

```bash
# Generar una clave de encriptación
php artisan key:generate

# Crear los enlaces simbolicos para hacer publico parte del storage
php artisan storage:link

# Ejecutar migraciones, esto creara la estructura de la base de datos.
php artisan migrate

# Crear los datos iniciales necesarios para el proyecto (cuentas de empleado).
php artisan db:seed
```

8. Arrancar los servidors

_Estos comandos deben de ejecutarse en terminales diferentes pues bloquean el acceso a esta._

```bash
# El proyecto depende del servidor vite para desarrollo
npm run dev

# La parte de ---host=0.0.0.0 es opionale, pero permite el uso de las API desde otros dispositivos en la LAN
php artisan serve --host=0.0.0.0
```

> [!NOTE]
> A pesar de que despues de levantar el servidor php la url puede decir http://0.0.0.0:8000, la web es accesible desde localhost o 127.0.0.1.



### Modulos del sistema 🧩

- Clientes 🙂
- Empleados 💁‍♂️
- Ventas 💰
- Productos 🌮
- Categorias 📁
- Sensores IoT🔌

### Roles de acceso 👑

1. **Administrador** (_Tiene acceso completo a todos los modulos de la web_)👑
2. **Gerente** (_Tiene acceso completo excepto empleados (no puede borrar) y clientes (donde solo puede ver)_)🦸
3. **Empleado** (_Tiene acceso solo para ver los modulo de productos, categorías y clientes, además de acceso total a ventas, excepto eliminar_)👨‍🍳
