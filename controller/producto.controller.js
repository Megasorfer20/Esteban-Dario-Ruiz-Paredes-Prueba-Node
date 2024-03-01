// Importa los modelos y las validaciones

import { Productos } from "../models/productos.model.js";
import {
  lenghtValidation,
  uniqueValidation,
} from "../middlewares/validations.js";

/**
 * Valida los datos del producto.
 * @param {Object} content - Contiene los datos a validar.
 * @param {number} content.estado - El estado del producto.
 * @param {boolean} content.kit - Indica si el producto es un kit.
 * @param {string} content.barcode - El código de barras del producto.
 * @param {string} content.nombre - El nombre del producto.
 * @param {string} content.presentacion - La presentación del producto.
 * @param {string} content.descripcion - La descripción del producto.
 * @param {string} content.foto - La foto del producto.
 * @param {number} content.peso - El peso del producto.
 * @returns {Object} - Retorna los valores validados.
 * @throws {Error} - Lanza un error si algún campo está vacío.
 */
export const validateProductos = async (content) => {
  // Desestructuramos el contenido para obtener los valores necesarios
  const {
    estado,
    kit,
    barcode,
    nombre,
    presentacion,
    descripcion,
    foto,
    peso,
  } = content;

  // Verificamos que todos los campos necesarios estén presentes
  if (!nombre || !barcode || !presentacion) {
    throw new Error(`Campo vacío, por favor rellenar todos los campos`);
  } else {
    // Creamos un objeto con los valores validados
    const values = {
      estado: estado ? estado : 1,
      kit: kit ? kit : 0,
      barcode: await uniqueValidation("barcode", Productos, barcode),
      nombre: await lenghtValidation(nombre, 60),
      presentacion: await lenghtValidation(presentacion, 25),
      descripcion: descripcion ? descripcion : null,
      foto: foto ? foto : null,
      peso: peso ? peso : 0.0,
    };

    // Retornamos los valores validados
    return values;
  }
};
