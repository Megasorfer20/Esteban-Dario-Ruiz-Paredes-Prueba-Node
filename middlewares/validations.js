import { getConnection } from "../database/dbconection.js";

export const lenghtValidation = async (text, limit) => {
  try {
    if (text) {
      if (text.length <= limit) {
        return text;
      } else {
        throw new Error(`Se excedió del límite de carácteres`);
      }
    } else {
      throw new Error(`Campo vacío, por favor rellenar todos los campos`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const uniqueValidation = async (searchRow, table, value) => {
  try {
    if (searchRow) {
      const pool = await getConnection();

      const query = `
        SELECT ${searchRow} FROM ${table}
        `;

      const connection = await pool.getConnection();
      const [rows, fields] = await connection.execute(query);
      console.log(rows);
      connection.release();

      if (rows.includes(value)) {
        throw new Error(
          `El campo debe ser único, por favor cambiar valor de ${searchRow}`
        );
      } else {
        return value;
      }
    } else {
      throw new Error(`Campo vacío, por favor rellenar todos los campos`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const existValidation = async (searchRow, table, value) => {
  try {
    if (searchRow) {
      const pool = await getConnection();

      const query = `
          SELECT ${searchRow} FROM ${table}
          `;

      const connection = await pool.getConnection();
      const [rows, fields] = await connection.execute(query);
      console.log(rows);
      connection.release();

      if (rows.includes(value)) {
        return value;
      } else {
        throw new Error(
          `El campo debe ser existente, por favor cambiar valor de ${searchRow}`
        );
      }
    } else {
      throw new Error(`Campo vacío, por favor rellenar todos los campos`);
    }
  } catch (error) {
    console.error(error);
  }
};
