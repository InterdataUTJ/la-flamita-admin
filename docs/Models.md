# MongoDB Models

##### Tabla de contenidos

1. [`Empelado`](#empleado)
2. [`Venta`](#venta)
3. [`Producto`](#producto)
4. [`Cliente`](#cliente)
5. [`Categoria`](#categoria)
6. [`Modulo`](#modulo)



## Empleado

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "apellido": "string",
    "correo": "string",
    "clave": "string",
    "avatar": "string",
    "estado": "boolean",
    "rol": "ENUM('ADMINISTRADOR', 'GERENTE', 'EMPLEADO')",
    "updated_at": "Date", // Interno de Laravel 
    "created_at": "Date"  // Interno de Laravel
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "corero": [1, "unique", "sparse"] // Asc - Unique - Sparse
}
```



## Venta

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "empleado_id": "ObjectId", // Relacion con modelo empleado
    "cliente_id": "ObjectId", // Relacion con modelo cliente
    "fecha_venta": "Date",
    "fecha_pago": "Date",
    "estado": "ENUM('PENDIENTE', 'PAGADO', 'COMPLETADO')",
    "token": "string",
    "metodo_pago": "string",
    "paypal_id": "string",
    "updated_at": "Date", // Interno de Laravel 
    "created_at": "Date",  // Interno de Laravel
    "productos": [{ // Embedded - ProductoVenta
        "_id": "ObjectId",
        "producto_id": "ObjectId",
        "cantidad": "number",
        "precio": "decimal",
        "descuento": "number",
        "updated_at": "Date", // Interno de Laravel 
        "created_at": "Date",  // Interno de Laravel
    }]
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "token": [1, "unique", "sparse"], // Asc - Unique - Sparse
    "paypal_id": [1, "unique", "sparse"], // Asc - Unique - Sparse
}
```



## Producto

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "descripcion": "string",
    "precio": "decimal",
    "existencias": "number",
    "estado": "boolean",
    "descuento": "decimal", // Porcentaje
    "updated_at": "Date", // Interno de Laravel 
    "created_at": "Date",  // Interno de Laravel
    "fotos": [{ // Embedded - ProductoFoto
        "_id": "ObjectId", // Automatico por MongoDB
        "url": "string",
        "updated_at": "Date", // Interno de Laravel 
        "created_at": "Date",  // Interno de Laravel
    }],
    "categorias": ["ObjectId"] // Referencia a CategoriaDato
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
}
```



## Cliente

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "apellido": "string",
    "correo": "string",
    "clave": "string",
    "avatar": "string",
    "estado": "boolean",
    "google_id": "string",
    "remember_token": "string", // Interno de laravel
    "updated_at": "Date", // Interno de Laravel 
    "created_at": "Date",  // Interno de Laravel
    "carrito": [{ // Embedded - CarritoItem
        "_id": "ObjectId",
        "producto_id": "ObjectId",
        "cantidad": "number",
        "precio": "decimal",
        "descuento": "number",
        "updated_at": "Date", // Interno de Laravel 
        "created_at": "Date",  // Interno de Laravel
    }]
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "corero": [1, "unique", "sparse"], // Asc - Unique - Sparse
    "google_id": [1, "unique", "sparse"] // Asc - Unique - Sparse
}
```



## Categoria

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "descripcion": "string",
    "updated_at": "Date", // Interno de Laravel 
    "created_at": "Date",  // Interno de Laravel
    "datos": [{ // Embedded - CategoriaDato
        "_id": "ObjectId",
        "nombre": "string",
        "updated_at": "Date", // Interno de Laravel 
        "created_at": "Date",  // Interno de Laravel
    }]
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "nombre": [1, "unique"], // Asc - Unique
    "datos.nombre": [1, "unique"], // Asc - Unique
}
```



## Modulo

##### Datos a almacenar

```json
{
    "_id": "ObjectId", // Automatico por MongoDB
    "nombre": "string",
    "token": "string",
    "updated_at": "Date", // Interno de Laravel 
    "created_at": "Date",  // Interno de Laravel
    "datos": [{ // Embedded - ModuloDato
        "_id": "ObjectId",
        "datos": "string", // Datos serializados
        "updated_at": "Date", // Interno de Laravel 
        "created_at": "Date",  // Interno de Laravel
    }]
}
```

##### Indices

```json
{
    "_id": [1, "unique"], // Asc - Unique
    "nombre": [1, "unique"], // Asc - Unique
    "token": [1, "unique"], // Asc - Unique
}
```
