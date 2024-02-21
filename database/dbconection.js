import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

export const getConnection = async () => {
  try {
    const connection = mysql.createPool({
      host: process.env.HOST,
      database: process.env.DATABASE,
      user: process.env.DUER,
      password: process.env.PASSWORD,
    });
    console.log(`Successfull conection into the Database`);
    return connection;
  } catch (error) {
    throw error;
  }
};
