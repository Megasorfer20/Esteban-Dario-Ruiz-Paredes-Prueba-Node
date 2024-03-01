// Importaciones de los modelos necesarios y las funciones de validación
import { Carritos } from "../models/carritos.model.js";
import { Productos } from "../models/productos.model.js";
import { Tiendas } from "../models/tiendas.model.js";
import { TiendasProductos } from "../models/tiendasProductos.model.js";
import { Users } from "../models/users.model.js";
import { listProducts } from "./listProducts.controller.js";
import {
  existValidation,
  numberValdation,
} from "../middlewares/validations.js";


/**
 * Recupera y formatea información sobre los productos de un carrito específica de una base de datos.
 *
 * @param {Object} query - El objeto de consulta que contiene el ID de la tienda y usuario.
 * @param {Object} content - array de objetos, donde cada objeto representa un producto y contiene información sobre ese producto.
 */

//Función para agregar elementos al carrito
export const agregarCarrito = async (content, query) => {
  // Extrae el ID del usuario y el ID del producto de la tienda de la consulta
  const { uId, tpId } = query;
  let uIdValidate = query.uId;
  // Extrae la cantidad del contenido
  const { cantidad } = content;

  // Valida el ID del usuario
  if (isNaN(uId)) {
    uIdValidate = 1;
  } else {
    uIdValidate = uId;
  }

  // Busca el producto en la tienda
  const ids = await TiendasProductos.findOne({
    where: { id: tpId },
    attributes: ["id_producto", "id_tienda", "compra_maxima"],
  });

  // Valida los IDs y la cantidad
  const validatedUserId = await numberValdation(uIdValidate);
  const validateProductoId = await numberValdation(ids.id_producto);
  const validateTiendaId = await numberValdation(ids.id_tienda);
  const validateCantidad = await numberValdation(cantidad);
  if (
    validatedUserId <= 0 ||
    validateProductoId <= 0 ||
    validateTiendaId <= 0 ||
    validateCantidad <= 0
  ) {
    throw new Error(`El valor debe ser mayor o igual a 1`);
  }

  // Verifica si la cantidad es menor que la compra máxima
  if (ids.compra_maxima > validateCantidad) {
    throw new Error(`La cantidad debe ser menor que ${ids.compra_maxima}`);
  } else {
    // Crea los datos del carrito
    const dataCarrito = {
      cantidad: validateCantidad,
      id_producto: await existValidation("id", Productos, validateProductoId),
      id_tienda: await existValidation("id", Tiendas, validateTiendaId),
      id_user: await existValidation("id", Users, validatedUserId),
      created_at: new Date(),
    };

    // Retorna los datos del carrito
    return dataCarrito;
  }
};


/**
 * Recupera y formatea información sobre Carritos de una base de datos.
 *
 * @param {Object} query - El objeto de consulta que contiene el ID del usuario y la tienda.
 * @returns {Promise<Array>} Un array de objetos, donde cada objeto representa una tienda y contiene información sobre el carrito ese user y la tienda.
 */

// Función para listar los productos en el carrito
export const listCarrito = async (query) => {
  // Extrae el ID de la tienda y el ID del usuario de la consulta
  const { tId, uId } = query;

  // Busca todos los carritos que coincidan con el ID de la tienda y el ID del usuario
  const listaCarritos = await Carritos.findAll({
    where: { id_tienda: tId, id_user: uId },
    attributes: ["id", "cantidad", "id_producto", "id_tienda", "id_user"],
  });

  // Obtiene la lista de productos
  const dataTiendaUsarios = await listProducts(query);

  // Reduce la lista de productos a aquellos que están en el carrito
  const productoCarrito = dataTiendaUsarios.reduce((finalElement, producto) => {
    const carrito = listaCarritos.find(
      (carrito) => carrito.id_producto === producto.id_producto
    );
    if (carrito) {
      producto.cantidad = carrito.cantidad;
      if (producto.promocion && producto.promocion.length > 0) {
        producto.valor_total =
          producto.cantidad * producto.promocion[0].valor_promocion;
      } else {
        producto.valor_total = producto.cantidad * producto.valor;
      }
      finalElement.push(producto);
    }
    return finalElement;
  }, []);

  // Retorna la lista de productos en el carrito
  return productoCarrito;
};
