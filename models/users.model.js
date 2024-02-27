import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";

const sequelize = declarationDB();

export const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: {
        isIn: [[0, 1]],
      },
      comment: "0=Inactivo 1=Activo",
      defaultValue: 1,
    },
    tipo: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      comment: "1=Admin 2=Tienda 3=Cliente",
      validate: {
        isIn: [[1, 2, 3]],
      },
    },
    login: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        isIn: [[1, 2]],
      },
      comment: "1=Teléfono 2=Correo",
    },
    telefono: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      unique: true,
      comment: "Identificador Principal. Unique",
    },
    codigo_temporal: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
      defaultValue: null,
      comment: "Código temporal para Login por mensaje de texto o correo",
    },
    correo: {
      type: DataTypes.STRING(70),
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    comment: "Son todos los Usuarios del sistema",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);
