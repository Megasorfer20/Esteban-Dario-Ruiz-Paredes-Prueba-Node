// Importamos Sequelize y dotenv
import { Sequelize } from "sequelize";
import { config } from "dotenv";

// Cargamos las variables de entorno
config();

// Esta función crea una nueva instancia de Sequelize utilizando las variables de entorno
export const declarationDB = () => {
  const sequelize = new Sequelize(
    process.env.DATABASE, // Nombre de la base de datos
    process.env.DUSER, // Nombre de usuario de la base de datos
    process.env.PASSWORD, // Contraseña de la base de datos
    {
      host: process.env.HOST, // Host de la base de datos
      dialect: process.env.DBDIALECT, // Dialecto de la base de datos (MySQL en est caso)
    }
  );
  return sequelize; // Devolvemos la instancia de Sequelize
};

// Esta función establece una conexión con la base de datos
export const getConnection = async () => {
  try {
    const sequelize = declarationDB(); // Obtenemos la instancia de Sequelize
    await sequelize.sync() // Sincronizamos el modelo con la base de datos
    await sequelize.authenticate(); // Autenticamos la conexión
    console.log(`Successfull conection into the Database`); // Si todo va bien, mostramos un mensaje de éxito
  } catch (error) {
    console.log(`Yout can't connect into the database: ${error}`); // Si hay un error, lo mostramos
  }
};