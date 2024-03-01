//Importa los módulos necesarios.

import { Op } from "sequelize"; // Operadores de Sequelize para consultas.
// Importa los modelos de la base de datos.
import { Pedidos } from "../models/pedidos.model.js";
import { PedidoEstados } from "../models/pedidosEstados.model.js";
import { PedidosProductos } from "../models/pedidosProductos.model.js";
import { Tiendas } from "../models/tiendas.model.js";


/**
 * Recupera y formatea información sobre pedidos de una base de datos.
 *
 * @param {Object} query - El objeto de consulta que contiene el ID del usuario.
 * @returns {Promise<Array>} Un array de objetos, donde cada objeto representa una tienda y contiene información sobre los pedidos de esa tienda.
 */

export const listPedidos = async (query) => {
  // Extrae el ID del usuario de la consulta.
  const { uId } = query;

  // Recupera todos los pedidos del usuario.
  const pedidosUsuario = await Pedidos.findAll({
    where: { id_user: uId },
    attributes: ["id"],
  });

  // Extrae los IDs de los pedidos.
  const idsPedidos = pedidosUsuario.map((pedido) => pedido.id);

  // Realiza una consulta para recuperar información detallada sobre los pedidos.
  const consultaPedidos = await Pedidos.findAll({
    where: { id_user: uId },
    include: [
      // Incluye información sobre el estado de los pedidos.
      {
        model: PedidoEstados,
        as: "pedidos_estados",
        required: true,
        where: {
          estado: { [Op.in]: [1, 2, 3] },
          id_pedido: { [Op.in]: idsPedidos },
        },
      },
      // Incluye información sobre los productos de los pedidos.
      {
        model: PedidosProductos,
        as: "pedidos_productos",
        required: true,
        where: {
          id_pedido: { [Op.in]: idsPedidos },
        },
      },
      // Incluye información sobre la tienda de los pedidos.
      {
        model: Tiendas,
        as: "tienda",
        required: true,
        where: { estado: 1 },
        attributes: ["id", "nombre"],
      },
    ],
  });

  // Agrupa los pedidos por tienda y formatea la información.
  const pedidosPorTienda = consultaPedidos.reduce(
    (listadoTiendaPedido, pedido) => {
      // Si la tienda no existe en el listado, la agrega.
      if (!listadoTiendaPedido[pedido.tienda.id]) {
        listadoTiendaPedido[pedido.tienda.id] = {
          id_tienda: pedido.tienda.id,
          nombre: pedido.tienda.nombre,
          valor_pedidos: 0,
          cantidad_pedidos: 0,
          pedidos: [],
        };
      }

      // Determina el estado del pedido.
      let estado = null;
      if (pedido.pedidos_estados[0].estado === 1) {
        estado = "Creado";
      } else if (pedido.pedidos_estados[0].estado === 2) {
        estado = "Confirmado";
      } else if (pedido.pedidos_estados[0].estado === 3) {
        estado = "Enviado";
      }

      // Formatea la información de los productos del pedido.
      const productos = pedido.pedidos_productos.map((producto) => ({
        id_producto: producto.id_producto,
        cantidad: producto.cantidad,
        valor: producto.valor_unitario,
        valor_promocion: producto.valor_unitario_promocion,
        valor_total: producto.total_final,
      }));

      // Formatea la información del pedido.
      const pedidoFormateado = {
        id: pedido.id,
        fecha: pedido.entrega_fecha,
        estado: estado,
        valor_final: parseFloat(pedido.valor_final),
        productos: productos,
      };

      // Agrega la información del pedido a la tienda correspondiente.
      listadoTiendaPedido[pedido.tienda.id].valor_pedidos +=
        pedidoFormateado.valor_final;
      listadoTiendaPedido[pedido.tienda.id].cantidad_pedidos += 1;
      listadoTiendaPedido[pedido.tienda.id].pedidos.push(pedidoFormateado);

      return listadoTiendaPedido;
    },
    {}
  );

  // Convierte el objeto de listado de tiendas a un array.
  const resultado = Object.values(pedidosPorTienda);

  return resultado;
};
