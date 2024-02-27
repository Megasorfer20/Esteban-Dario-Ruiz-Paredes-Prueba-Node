import { getConnection } from "../database/dbconection.js";
import {
  existValidation,
  lenghtValidation,
  uniqueValidation,
} from "../middlewares/validations.js";

export const postParameter = async (req, res) => {
  let connection;
  try {
    const { parameter } = req.params;

    const query = await validations(parameter, req.body);

    const pool = await getConnection();
    connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      await connection.release();
    }
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
          nombre: await lenghtValidation(nombre, 60),
          barcode: await uniqueValidation("barcode", "productos", barcode),
          presentacion: await lenghtValidation(nombre, 25),
        };
        return `INSERT INTO productos(nombre,barcode, presentacion) VALUES ("${values.nombre}","${values.barcode}","${values.presentacion}")`;
      }
    }

    if (parameter === "tiendaProducto") {
      const { idProducto, idTienda, valor, compraMaxima } = content;
      if (!idProducto || !idTienda || !valor || !compraMaxima) {
        throw new Error(`Campo vacío, por favor rellenar todos los campos`);
      } else {
        const values = {
          idProducto: await existValidation("id", "productos", idProducto),
          idTienda: await existValidation("id", "tiendas", idTienda),
          valor: valor,
          compraMaxima: Number(compraMaxima),
        };
        return `INSERT INTO tiendas_productos(id_producto,id_tienda, valor, compra_maxima) VALUES ("${values.idProducto}","${values.idTienda}","${values.valor}","${values.compraMaxima}")`;
      }
    }
  } catch (error) {
    console.error(error);
  }
};