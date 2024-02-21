import { getConnection } from "../database/dbconection.js";
import {
  existValidation,
  lenghtValidation,
  uniqueValidation,
} from "../middlewares/validations.js";

export const postParameter = async (req, res) => {
  try {
    const { parameter } = req.params;
    const pool = await getConnection();

    const query = validations(parameter, req.body);

    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(query);
    res.json(rows);
    connection.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const validations = async (parameter, content) => {
  try {
    if (parameter === "productos") {
      const { nombre, barcode, presentacion } = content;
      if (!nombre || !barcode || !presentacion) {
        throw new Error(`Campo vacío, por favor rellenar todos los campos`);
      } else {
        const values = {
          nombre: lenghtValidation(nombre, 60),
          barcode: uniqueValidation("barcode", "productos", barcode),
          presentacion: lenghtValidation(nombre, 25),
        };
        return `INTERT INTO productos(nombre,barcode, presentacion) VALUES (${values.nombre},${values.barcode},${values.presentacion})`;
      }
    }

    if (parameter === "tiendaProducto") {
      const { idProducto, idTienda, valor, compraMaxima } = content;
      if (!idProducto || !idTienda || !valor || !compraMaxima) {
        throw new Error(`Campo vacío, por favor rellenar todos los campos`);
      } else {
        const values = {
          idProducto: existValidation("id", "productos", idProducto),
          idTienda: existValidation("id", "tiendas", idTienda),
          valor: valor,
          compraMaxima: Number(compraMaxima),
        };
        return `INTERT INTO tiendas_productos(id_producto,id_tienda, valor, compra_maxima) VALUES (${values.idProducto},${values.idTienda},${values.valor},${values.compraMaxima})`;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
