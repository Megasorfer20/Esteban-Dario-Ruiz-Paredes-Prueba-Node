# Prueba Técnica Campuslands

## EndPoitns a construir Primera Parte

Los productos se crean de manera general en el sistema, para esto se requiere crear un Endpoint que reciba
los datos básicos de un producto y lo almacene en la tabla PRODUCTOS validando los datos de entrada

Validaciones

- **Nombre:** Requerido - Maximo 60 caracteres
- **barcode:** Requerido - Valor unico en la tabla
- **presentacion:** Requerido - Maximo 25 caracteres

**EndPoint:** ```http://localhost:3000/API/productos``` **Method:** ``POST``

Ejemplo de como debe ser el cuerpo de la consulta:

```json
{
  "nombre": "Celulares Maximo",
  "barcode": "999999999",
  "presentacion": "100 Gb"
}
```

Asociar un producto a una Tienda, para esto se debe hacer Insert en la tabla tiendas_productos asignando
valores personalizados

Validaciones

- **id_producto:** Requerido - existir en tabla Productos
- **id_tienda:** Requerido - existir en la tabla Tiendas
- **valor:** Requerido
- **compra_maxima:** Requerido - Numerico

**EndPoint:** `http://localhost:3000/API/tiendaProducto` **Method:** ``POST``

Ejemplo de como debe ser el cuerpo de la consulta:

```json
{
  "idProducto": 2,
  "idTienda": 1,
  "valor": 5000,
  "compraMaxima": 5
}
```

## EndPoitns a construir Segunda Parte

### Ejercicio 1

Se requiere construir un endPoint que permita listar los productos de una tienda específica, para esto se requiere recibir como parámetro el id_tienda en el EndPoint. Los productos de la tienda se encuentran en la Tabla Tiendas_Productos allí está el "id_producto", "valor", esta tabla está relacionada con la Tabla Productos donde podemos obtener "Nombre", "Barcode". Para obtener el valor_promocion se debe verificar si el producto cuenta con una promoción disponible, para esto se tiene una relación entre la tabla Tiendas_productos y Promociones por medio del Id_promocion. Si esta relación existe entonces se debe verificar si la tienda tiene la promoción vigente, esto se verifica en la tabla Tiendas_promociones validando el "id_promocion", "id_tienda", "estado" = 1 y que la Fecha de hoy esté entre "inicio" y "Fin"... si esto es verdadero entonces se debe obtener la información de la promoción, (id_promocion, nombre, porcentaje) para el valor_promocion se debe tomar el valor original y restar el porcentaje de descuento que está en promociones.

**EndPoint:** `http://localhost:3000/API/catalogo` **Method:** GET

Se queriere de los parametros **tId** para que funcione la consulta correctamente, cuyo valor es equivalente al ID de la tienda

**Ejemplo:** `http://localhost:3000/API/catalogo?tId=1`

### Ejercicio 2

Agregar producto al carrito. Se debe hacer Insert en la tabla CARRITOS con el id_producto, id_tienda, id_user (por default 1) y cantidad (por default 1).

**EndPoint:** `http://localhost:3000/API/carrito` **Method:** POST

Se queriere de los parametros **tpId** para que funcione la consulta correctamente, cuyo valor es equivalente al ID de la "tiendas_productos". De allí se obtienen los **id_tienda** y **id_proucto**.

Para el parametro **uId** es opcional pero hace referencia al usuario User, si no se ponee ningun valor, por defecto su valor será 1.

**Ejemplo:** `http://localhost:3000/API/carrito?tpId=1`

Ejemplo de como debe ser el cuerpo de la consulta:

```json
{
  "cantidad": 5
}
```

### Ejercicio 3

Listar los productos en el carrito de una tienda específica, se debe listar los productos de la tabla CARRITOS
donde el id_tienda y el id_user coincida con los solicitados, de los productos se debe obtener su cantidad,
valor unitario, valor_promocion, valor total (valor unitario ó valor_promocion X cantidad) y los datos básicos de
los productos

**EndPoint:** http://localhost:3000/API/carrito **Method:** ``GET``

Se queriere de los parametros **tpId** para que funcione la consulta correctamente, cuyo valor es equivalente al ID de la tienda

**Ejemplo:** `http://localhost:3000/API/carrito?tId=1`

### Ejercicio 4

Realizar Pedido.

● Para esto se debe tomar todos los productos de la tienda que el cliente tiene en el carrito y pasarlos a pedido, primero se debe crear el pedido con los datos básicos

- **instrucciones:** se envia en el requets
- **entrega_fecha:** Se envia en el request
- **valor_productos:** Suma del valor de los productos sin tener encuenta la promocion
- **valor_descuento:** Sumar la diferencia entre el valor y el valor_promocion de los productos que aplican
- **valor_envio:** se debe obtener segun la distancia registrada en la direccion del cliente y los parametros de la tienda en tiendas_distancias
- **valor_final:** se debe calcular sumando valor_productos - valor_descuento + valor_envio
- **direcion:** Se obtiene de la direccion actual del cliente
- **id_tienda:** Se envia en el request
- **id_user:** se envia en el request

● También se debe hacer Insert en la tabla Pedidos_Estados con el estado = 1

● Después de crear el Pedido se deben crear los pedidos_productos segun los productos que están en el carrito

- **cantidad:** La que se tenga en el carrito
- **valor_unitario:** Valor unitario del producto antes de promocion
- **valor_unitario_promocion:** Valor del producto con promocion... si no tiene entonces valor unitario
- **total_teorico:** multiplicar valor_unitario X cantidad
- **total_final:** multiplicar valor_unitario_promocion x cantidad
- **id_promocion:** Solo si aplica en ese momento, de lo contrario NULL
- **id_producto:** Se obtiene del carrito
- **id_pedido:** Relacionar al pedido creado anteriormente

Aparte de lo anterior dicho, al ejeutarse el endpoint, los objetos del carrito que pasaron a ser pedido van a ser eliminados de la tabla carritos, para que así solo hayan elementos sin ser pedidos en el carrito

El endpoint que se va a usar es el siguiente

**EndPoint:** `http://localhost:3000/API/realizarPedido` **Method:** POST

Ejemplo de como debe ser el cuerpo de la consulta:

```json
{
  "instrucciones": "Enviar el preferiblemnte en a madrugada para que sea sorpresa y una nota",
  "entrega_fecha": "10-05-2023",
  "id_tienda": 1,
  "id_user": 1
}
```

### Ejercicio 5

Listar los Pedidos del Cliente, tener en cuenta que el Cliente puede tener pedidos en varias tiendas entonces se debe agrupar por tienda y solo se deben listar los pedidos en estado (1,2,3).... ejemplo de respuesta

**EndPoint:** ``http://localhost:3000/API/carrito`` **Method:** GET

Se queriere de los parametros **uId** para que funcione la consulta correctamente, cuyo valor es equivalente al ID del User

**Ejemplo:** `http://localhost:3000/API/pedidos?uId=1`