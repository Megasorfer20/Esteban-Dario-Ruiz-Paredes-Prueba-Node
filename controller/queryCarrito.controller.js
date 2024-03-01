// Importaciones de los modelos necesarios
import { Carritos } from "../models/carritos.model.js";
import { TiendasDistanias } from "../models/tiendaDistancia.model.js";
import { Tiendas } from "../models/tiendas.model.js";
import { UserClientes } from "../models/userClientes.model.js";
import { UsersDirecciones } from "../models/userDirecciones.model.js";
import { Users } from "../models/users.model.js";


/**
 * Recupera y formatea información sobre Carritos de una base de datos.
 *
 * @param {Object} idTienda - El objeto de consulta que contiene el ID de la tienda.
 * @param {Object} idUser - El objeto de consulta que contiene el ID del usuario.
 * @returns {Promise<Array>} Un array de objetos, obtiene los elementos del carrito e informacion el User y la tienda.
 */


// Función para obtener toda la información del carrito
export const queryCarritoAllInfo = async (idTienda, idUser) => {
  // Retorna todos los carritos que coincidan con el ID de la tienda y el ID del usuario
  return await Carritos.findAll({
    where: { id_tienda: idTienda, id_user: idUser },
    include: [
      {
        // Incluye información del usuario
        model: Users,
        as: "user",
        required: true,
        where: { id: idUser },
        attributes: ["id"],
        include: [
          {
            // Incluye información de las direcciones del usuario
            model: UsersDirecciones,
            at: "users_direcciones",
            required: true,
            where: { id_user: idUser },
            attributes: ["direccion", "distancia", "id"],
            include: [
              {
                // Incluye información de los clientes del usuario
                model: UserClientes,
                at: "users_clientes",
                required: false,
                where: { id_user: idUser },
                attributes: [
                  "id",
                  "nombre",
                  "identificacion",
                  "id_direccion",
                  "id_user",
                ],
              },
            ],
          },
        ],
      },
      {
        // Incluye información de la tienda
        model: Tiendas,
        as: "tienda",
        where: { id: idTienda },
        required: true,
        attributes: [
          "id",
          "direccion",
          "direccion_anexo",
          "direccion_barrio",
          "nombre",
        ],
        include: [
          {
            // Incluye información de las distancias de la tienda
            model: TiendasDistanias,
            as: "tiendas_distancias",
            where: { id_tienda: idTienda },
            required: false,
            attributes: ["id", "id_tienda", "desde", "hasta", "valor"],
          },
        ],
      },
    ],
  });
};
