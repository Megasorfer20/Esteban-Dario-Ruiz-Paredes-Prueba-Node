import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { UsersDirecciones } from "./userDirecciones.model.js";
import { Users } from "./users.model.js";

const sequelize = declarationDB();

export const UserClientes = sequelize.define(
  "users_clientes",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
    },
    genero: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3]],
      },
      comment: "1=Otro 2=Masculino 3=Femenino",
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    identificacion: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      comment: "El label se obtiene de x_parametros.tipo=101",
    },
    id_direccion: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "users_clientes",
    timestamps: false,
    comment: "Son los datos específicos de los Clientes",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);

