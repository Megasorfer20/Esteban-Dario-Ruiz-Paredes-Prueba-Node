import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { TiendasPromociones } from "./tiendasPromociones.model.js";

const sequelize = declarationDB();

export const Promociones = sequelize.define(
  "promociones",
  {
    id: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique:true
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        isIn: [[0, 1]],
      },
      comment: "0=Inactivo 1=Activo",
      defaultValue: 1,
    },
    nombre: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
      comment: "Max 900",
    },
    porcentaje: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    dias_semana: {
      type: DataTypes.STRING(21),
      allowNull: false,
      defaultValue: "[0,0,0,0,0,0,0]",
      comment:
        "0=No 1=Si... Lunes=Día_1 Domingo=Día_7... Aplica para Full_categoría",
    },
  },
  {
    tableName: "promociones",
    timestamps: false,
    comment: "Son las Promociones con sus datos básicos de configuración",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);

