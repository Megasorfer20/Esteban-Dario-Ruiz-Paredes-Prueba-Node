// Importa los modelos y las validaciones

import { Productos } from "../models/productos.model.js";
import { Tiendas } from "../models/tiendas.model.js";
import {
  existValidation,
  numberValdation,
} from "../middlewares/validations.js";

/**
 * Valida los datos de la tienda y el producto.
 * @param {Object} content - Contiene los datos a validar.
 * @param {number} content.compra_maxima - La cantidad máxima de compra permitida.
 * @param {number} content.valor - El valor del producto.
 * @param {number} content.id_promocion - El ID de la promoción (si existe).
 * @param {number} content.id_tienda - El ID de la tienda.
 * @param {number} content.id_producto - El ID del producto.
 * @returns {Object} - Retorna los valores validados.
 * @throws {Error} - Lanza un error si algún campo está vacío o si el valor es menor o igual a 0.
 */


export const validateTiendaProducto = async (content) => {
  // Desestructuramos el contenido para obtener los valores necesarios
  const { compra_maxima, valor, id_promocion, id_tienda, id_producto } =
    content;

  // Verificamos que todos los campos necesarios estén presentes
  if (!id_producto || !id_tienda || !valor || !compra_maxima) {
    throw new Error(`Campo vacío, por favor rellenar todos los campos`);
  } else {
    // Validamos que compra_maxima y valor sean números
    const validatedCompraMaxima = await numberValdation(compra_maxima);
    const validateValor = await numberValdation(valor);

    // Verificamos que los valores sean mayores a 0
    if (validatedCompraMaxima <= 0 || validateValor <= 0) {
      throw new Error(`El valor debe ser mayor o igual a 1`);
    }

    // Creamos un objeto con los valores validados
    const values = {
      id_producto: await existValidation("id", Productos, id_producto),
      id_tienda: await existValidation("id", Tiendas, id_tienda),
      id_promocion: id_promocion ? id_promocion : null,
      valor: validateValor,
      compra_maxima: validatedCompraMaxima,
    };

    // Retornamos los valores validados
    return values;
  }
};

