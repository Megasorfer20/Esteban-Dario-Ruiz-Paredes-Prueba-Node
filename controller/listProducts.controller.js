//Importa los módulos necesarios.

import { Op } from "sequelize"; // Operadores de Sequelize para consultas.
// Importa los modelos de la base de datos.
import { Productos } from "../models/productos.model.js";
import { Promociones } from "../models/promociones.model.js";
import { TiendasProductos } from "../models/tiendasProductos.model.js";
import { TiendasPromociones } from "../models/tiendasPromociones.model.js";

/**
 * Recupera y formatea información sobre los productos de una tienda específica de una base de datos.
 *
 * @param {Object} query - El objeto de consulta que contiene el ID de la tienda.
 * @returns {Promise<Array>} Un array de objetos, donde cada objeto representa un producto y contiene información sobre ese producto.
 */


export const listProducts = async (query) => {
  // Extrae el ID de la tienda de la consulta.
  const { tId } = query;

  // Recupera todos los productos de la tienda.
  const listaProductos = await TiendasProductos.findAll({
    where: { id_tienda: tId },
    include: [
      // Incluye información sobre el producto.
      {
        model: Productos,
        as: "producto",
        required: true,
        attributes: ["id", "nombre", "presentacion", "barcode"],
        where: { estado: 1 },
      },
      // Incluye información sobre las promociones del producto.
      {
        model: Promociones,
        as: "promocione",
        required: false,
        attributes: ["id", "nombre", "porcentaje"],
        where: { estado: 1 },
        include: [
          // Incluye información sobre las promociones de la tienda.
          {
            model: TiendasPromociones,
            as: "tiendas_promociones",
            required: false,
            attributes: ["id", "inicio", "fin"],
            where: {
              id_tienda: tId,
              estado: 1,
              inicio: {
                [Op.lte]: new Date(),
              },
              fin: {
                [Op.gte]: new Date(),
              },
            },
          },
        ],
      },
    ],
    attributes: ["id_producto", "id_tienda", "valor"],
  });

  // Formatea la información de los productos.
  const data = listaProductos.map((producto) => ({
    id_producto: producto.id_producto,
    id_tienda: producto.id_tienda,
    nombre: producto.producto.nombre,
    presentacion: producto.producto.presentacion,
    barcode: producto.producto.barcode,
    valor: producto.valor,
    promocion:
      producto.promocione && producto.promocione.tiendas_promociones
        ? [
            {
              id_promocion: producto.promocione.id,
              nombre: producto.promocione.nombre,
              porcentaje: producto.promocione.porcentaje,
              valor_promocion:
                producto.valor -
                producto.valor * (producto.promocione.porcentaje / 100),
            },
          ]
        : [],
  }));

  return data;
};
