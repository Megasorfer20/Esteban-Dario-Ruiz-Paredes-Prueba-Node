// Importaciones de las funciones y módulos necesarios
import { getConnection, declarationDB } from "../database/dbconection.js";
import { listCarrito } from "./carrito.controller.js";
import { listPedidos } from "./getPedidos.controller.js";
import { listProducts } from "./listProducts.controller.js";

/**
 * Función para obtener parámetros
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Object} req.params - Los parámetros de la ruta.
 * @param {Object} req.query - Los parámetros de consulta de la URL.
 * @returns {Promise<Array>} Retorna una promesa que se resuelve en un array de elementos obtenidos.
 */


export const getsParameter = async (req, res) => {
  // Declara la base de datos
  const sequelize = declarationDB();
  try {
    // Establece la conexión con la base de datos
    getConnection();
    // Extrae el parámetro de la solicitud
    const { parameter } = req.params;
    let elementWillGet;

    // Si el parámetro es "catalogo", obtiene la lista de productos
    if (parameter === "catalogo") {
      elementWillGet = await listProducts(req.query);
    }

    // Si el parámetro es "carrito", obtiene la lista del carrito
    if (parameter === "carrito") {
      elementWillGet = await listCarrito(req.query);
    }

    // Si el parámetro es "pedidos", obtiene la lista de pedidos
    if (parameter === "pedidos") {
      elementWillGet = await listPedidos(req.query);
    }

    // Envía la respuesta con el estado 201 y los datos obtenidos
    await res
      .status(201)
      .json({ message: "Consultado Correctamente", data: elementWillGet });
  } catch (error) {
    // En caso de error, imprime el error y envía la respuesta con el estado 500 y el mensaje de error
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    // Cierra la conexión con la base de datos
    sequelize.close();
  }
};
