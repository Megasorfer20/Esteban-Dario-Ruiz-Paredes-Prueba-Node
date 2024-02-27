import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

export const declarationDB = () => {
  const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DUSER,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.DBDIALECT,
    }
  );
  return sequelize;
};

export const getConnection = async () => {
  try {
    const connection = mysql.createPool({
      host: process.env.HOST,
      database: process.env.DATABASE,
      user: process.env.DUSER,
      password: process.env.PASSWORD,
    });
    console.log(`se conectó a la base de datos 👍`);
    return connection;
  } catch (error) {
    throw error;
  }
};

export const getConnection2 = async () => {
  try {
    const sequelize = declarationDB();
    await sequelize.sync()
    await sequelize.authenticate();
    console.log(`Successfull conection into the Database`);
  } catch (error) {
    console.log(`Yout can't connect into the database: ${error}`);
  }
};
