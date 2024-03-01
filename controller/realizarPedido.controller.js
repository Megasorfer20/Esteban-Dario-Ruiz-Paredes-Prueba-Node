// Importa los modelos y las validaciones

import axios from "axios";
import { Carritos } from "../models/carritos.model.js";
import { Pedidos } from "../models/pedidos.model.js";
import { PedidoEstados } from "../models/pedidosEstados.model.js";
import { PedidosProductos } from "../models/pedidosProductos.model.js";
import { Tiendas } from "../models/tiendas.model.js";
import { Users } from "../models/users.model.js";
import { queryCarritoAllInfo } from "./queryCarrito.controller.js";
import { existValidation, sumadorArrays } from "../middlewares/validations.js";

/**
 * Realiza un pedido.
 * @param {Object} content - Contiene los datos del pedido.
 * @param {string} content.instrucciones - Las instrucciones para el pedido.
 * @param {string} content.entrega_fecha - La fecha de entrega del pedido.
 * @param {number} content.id_tienda - El ID de la tienda.
 * @param {number} content.id_user - El ID del usuario.
 * @param {number} content.valor_cupon - El valor del cupón.
 * @param {number} content.impuestos - Los impuestos.
 * @param {number} content.valor_impuestos - El valor de los impuestos.
 * @param {number} content.valor_comision - El valor de la comisión.
 * @returns {Object} - Retorna los datos del pedido insertado, los estados del pedido y los productos del pedido.
 * @throws {Error} - Lanza un error si algún campo está vacío.
 */

export const realizarPedido = async (content) => {
  // Extraemos los datos necesarios del contenido
  const {
    instrucciones,
    entrega_fecha,
    id_tienda,
    id_user,
    valor_cupon,
    impuestos,
    valor_impuestos,
    valor_comision,
  } = content;

  // Convertimos la fecha de entrega a formato ISO
  const fechaEntrega = new Date(entrega_fecha).toISOString();

  // Obtenemos la información del carrito
  const elementosCarrito = await queryCarritoAllInfo(id_tienda, id_user);

  // Obtenemos los datos de la tienda y los usuarios
  const dataTiendaUsarios = await axios
    .get(`http://localhost:3000/API/catalogo?tId=${id_tienda}`)
    .then((response) => response.data.data);

  // Formateamos la imformación para obtener los elementos neesarios
  const infoCompleta = elementosCarrito.map((elememtoCarrito) => {
    const productoCarrito = dataTiendaUsarios.find(
      (producto) => producto.id_producto === elememtoCarrito.id_producto
    );

    const direccionUser = elememtoCarrito.user.users_direcciones.find(
      (direccion) => direccion.users_clientes.length > 0
    );

    const comparacionRangos = elememtoCarrito.tienda.tiendas_distancias.find(
      (rango) =>
        rango.desde < direccionUser.distancia &&
        (rango.hasta > direccionUser.distancia || rango.hasta === null)
    );

    const nuevoElementoCarito = {
      ...elememtoCarrito.toJSON(),
      user: null,
      tienda: null,
    };

    return {
      elememtoCarrito: nuevoElementoCarito,
      productoCarrito,
      direccionUser,
      comparacionRangos,
    };
  });

  // Calculamos los valores necesarios y validamos los IDs
  const [valor_productos, valor_descuento, id_tiendas, id_users] =
    await Promise.all([
      sumadorArrays(infoCompleta, "valor_productos"),
      sumadorArrays(infoCompleta, "valor_descuento"),
      existValidation("id", Tiendas, id_tienda),
      existValidation("id", Users, id_user),
    ]);

  // Creamos los datos a insertar en el pedido
  const dataInsert = {
    instrucciones: instrucciones ? instrucciones : null,
    entrega_fecha: fechaEntrega,
    valor_productos,
    valor_descuento,
    valor_envio: infoCompleta[0].comparacionRangos.valor,
    valor_final: valor_descuento + infoCompleta[0].comparacionRangos.valor,
    id_tienda: id_tiendas,
    id_user: id_users,
    valor_cupon: valor_cupon ? valor_cupon : 0.0,
    direccion: infoCompleta[0].direccionUser.direccion,
    impuestos: impuestos ? impuestos : 0,
    valor_impuestos: valor_impuestos ? valor_impuestos : 0.0,
    valor_comision: valor_comision ? valor_comision : 0.0,
    created_at: new Date(),
  };

  // Insertamos el pedido
  const insertPedido = await Pedidos.create(dataInsert);

  // Insertamos el estado del pedido
  const insertPedidosEstados = await PedidoEstados.create({
    estado: 1,
    id_pedido: insertPedido.id,
    created_at: new Date(),
  });

  // Insertamos los productos del pedido
  const insertPedidosProductos = await Promise.all(
    infoCompleta.map(
      async ({ productoCarrito, promocion, elememtoCarrito }) => {
        const valor_unitario_promocion = promocion
          ? promocion.valor_promocion
          : productoCarrito.valor;
        const total_teorico = productoCarrito.valor * elememtoCarrito.cantidad;
        const total_final = valor_unitario_promocion * elememtoCarrito.cantidad;

        return PedidosProductos.create({
          cantidad: elememtoCarrito.cantidad,
          valor_unitario: productoCarrito.valor,
          valor_unitario_promocion,
          total_teorico,
          total_final,
          id_promocion: productoCarrito.promocion.id_promocion,
          id_producto: elememtoCarrito.id_producto,
          id_pedido: insertPedido.id,
        });
      }
    )
  );

  // Eliminamos los elementos del carrito
  await Carritos.destroy({
    where: {
      id_tienda: id_tienda,
      id_user: id_user,
    },
  });

  // Retornamos los datos del pedido insertado, los estados del pedido y los productos del pedido
  return { insertPedido, insertPedidosEstados, insertPedidosProductos };
};
