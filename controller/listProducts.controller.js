import { Op } from "sequelize";
import { getConnection, declarationDB } from "../database/dbconection.js";
import { Productos } from "../models/productos.model.js";
import { Promociones } from "../models/promociones.model.js";
import { Tiendas } from "../models/tiendas.model.js";
import { TiendasProductos } from "../models/tiendasProductos.model.js";
import { TiendasPromociones } from "../models/tiendasPromociones.model.js";
import {
  existValidation,
  lenghtValidation,
  uniqueValidation,
} from "../middlewares/validations.js";

export const listProducts = async (req, res) => {
  try {
    const { idTienda } = req.params;

    const listaProductos = await TiendasProductos.findAll({
      where: { id_tienda: idTienda },
      include: [
        {
          model: Productos,
          as: "producto",
          required: true,
          attributes: ["id","nombre", "presentacion", "barcode"],
          where: { estado: 1 },
        },
        {
          model: Promociones,
          as: "promocione",
          required: false,
          attributes: ["id", "nombre", "porcentaje"],
          where: { estado: 1 },
          include: [
            {
              model: TiendasPromociones,
              as: "tiendas_promociones",
              required: false,
              attributes: ["id", "inicio", "fin"],
              where: {
                id_tienda: idTienda,
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

    res.status(200).json({
      message: "Consultado Correctamente",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({ message: error.mesasge });
  }
};
