import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";

const sequelize = declarationDB();

export const Tiendas = sequelize.define(
  "tiendas",
  {
    id: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        isIn: [[0, 1]],
      },
      comment: "0=Inactivo 1=Activo",
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    direccion_anexo: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: null,
    },
    direccion_barrio: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: null,
    },
    calificacion: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    calificacion_cantidad: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
      defaultValue: 0,
    },
    impuestos: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment:
        "0=No 1=Si +Impto 2=Si Impto incluido 3=Si Impto incluido sin etiqueta.. Los pedidos se liquidan con Impuestos, aplica para Pedidos y Admin_Pedidos",
      validate: {
        isIn: [[0, 1, 2, 3]],
      },
    },
    dias_trabajados: {
      type: DataTypes.STRING(21),
      allowNull: false,
      defaultValue: "[1,1,1,1,1,1,0]",
      comment:
        "Arreglo de los días en trabaja el Cedis.. 0=No trabaja 1=Si trabaja... Lunes=Día_1 Domingo=Día_7",
    },
  },
  {
    tableName: "tiendas",
    timestamps: false,
    comment:
      "Es un Centro de Distribución principal, para distribuir a las Tiendas",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);
