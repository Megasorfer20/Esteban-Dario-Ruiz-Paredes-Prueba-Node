import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";

const sequelize = declarationDB();

export const Productos = sequelize.define(
  "productos",
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
    kit: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: {
        isIn: [[0, 1]],
      },
      comment:
        "0=No 1=Si... Para evaluar disponibilidad, descuentos y otros en productos_kits",
      defaultValue: 0,
    },
    barcode: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "Código de barras",
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    presentacion: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    foto: {
      type: DataTypes.STRING(120),
      allowNull: true,
      defaultValue: null,
      comment: "Max 200",
    },
    peso: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "En Kilogramos",
    },
  },
  {
    tableName: "productos",
    timestamps: false,
    comment: "Son los Productos en general de todo el Proyecto",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);
