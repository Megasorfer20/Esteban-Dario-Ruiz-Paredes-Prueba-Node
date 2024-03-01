// Importaciones de las funciones y módulos necesarios
import { getConnection, declarationDB } from "../database/dbconection.js";
import { Carritos } from "../models/carritos.model.js";
import { Productos } from "../models/productos.model.js";
import { TiendasProductos } from "../models/tiendasProductos.model.js";
import { validateTiendaProducto } from "./tiendaProucto.controller.js";
import { validateProductos } from "./producto.controller.js";
import { agregarCarrito } from "./carrito.controller.js";
import { realizarPedido } from "./realizarPedido.controller.js";

/**
 * Función para insertar parámetros
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Object} req.params - Los parámetros de la ruta.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {Object} req.query - Los parámetros de consulta de la URL.
 * @returns {Promise<Object>} Retorna una promesa que se resuelve en un objeto del elemento insertado.
 */
export const postParameter = async (req, res) => {
  const sequelize = declarationDB();
  try {
    getConnection();
    const { parameter } = req.params;
    let elementWillInsert;
    let newElement;

    // Si el parámetro es "productos", valida y crea un nuevo producto
    if (parameter === "productos") {
      elementWillInsert = await validateProductos(req.body);
      newElement = await Productos.create(elementWillInsert);
    }

    // Si el parámetro es "tiendaProducto", valida y crea un nuevo producto de tienda
    if (parameter === "tiendaProducto") {
      elementWillInsert = await validateTiendaProducto(req.body);
      newElement = await TiendasProductos.create(elementWillInsert);
    }

    // Si el parámetro es "carrito", agrega un nuevo producto al carrito
    if (parameter === "carrito") {
      elementWillInsert = await agregarCarrito(req.body, req.query);
      newElement = await Carritos.create(elementWillInsert);
    }

    // Si el parámetro es "realizarPedido", realiza un nuevo pedido
    if (parameter === "realizarPedido") {
      newElement = await realizarPedido(req.body);
    }

    // Envía la respuesta con el estado 201 y el nuevo elemento insertado
    await res.status(201).json(newElement);
  } catch (error) {
    // En caso de error, imprime el error y envía la respuesta con el estado 500 y el mensaje de error
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    // Cierra la conexión con la base de datos
    sequelize.close();
  }
};