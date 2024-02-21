# Prueba Técnica Campuslands

## EndPoitns a construir Primera Parte

Los productos se crean de manera general en el sistema, para esto se requiere crear un Endpoint que reciba
los datos básicos de un producto y lo almacene en la tabla PRODUCTOS validando los datos de entrada
Validaciones
Nombre: Requerido - Maximo 60 caracteres
barcode: Requerido - Valor unico en la tabla
presentacion: Requerido - Maximo 25 caracteres

**EndPoint:**  http://localhost:3000/API/productos

```
{
    "nombre":"Celulares Maximo",
    "barcode":"999999999",
    "presentacion":"100 Gb"
}
```

Asociar un producto a una Tienda, para esto se debe hacer Insert en la tabla tiendas_productos asignando
valores personalizados
Validaciones
id_producto: Requerido - existir en tabla Productos
id_tienda: Requerido - existir en la tabla Tiendas
valor: Requerido
compra_maxima: Requerido - Numerico

**EndPoint:**  http://localhost:3000/API/tiendaProducto

```
{
    "idProducto":2,
    "idTienda":1,
    "valor": 5000,
    "compraMaxima": 5
}
```