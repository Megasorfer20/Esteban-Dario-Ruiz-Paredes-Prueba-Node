import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { Users } from "./users.model.js";
import { Tiendas } from "./tiendas.model.js";

const sequelize = declarationDB();

export const Pedidos = sequelize.define(
  "pedidos",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    instrucciones: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    entrega_fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "El cliente cuando desea que su pedido sea entregado",
    },
    valor_productos: {
      type: DataTypes.DECIMAL(12, 3).UNSIGNED,
      allowNull: false,
    },
    valor_envio: {
      type: DataTypes.DECIMAL(10, 3).UNSIGNED,
      allowNull: false,
    },
    valor_descuento: {
      type: DataTypes.DECIMAL(12, 3).UNSIGNED,
      allowNull: false,
      comment: "Valor producto - Valor promo",
    },
    valor_cupon: {
      type: DataTypes.DECIMAL(11, 3).UNSIGNED,
      allowNull: false,
      defaultValue: 0.0,
      comment: "Valor descuento por cupón aplicado (tomado del pedido hijo)",
    },
    impuestos: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "0=No 1=Si",
      validate: {
        isIn: [[0, 1]],
      },
    },
    valor_impuestos: {
      type: DataTypes.DECIMAL(11, 3),
      allowNull: false,
      defaultValue: 0.0,
      comment:
        "Valor de impuestos de todos los productos -- No tiene en cuenta el valor final",
    },
    valor_final: {
      type: DataTypes.DECIMAL(12, 3).UNSIGNED,
      allowNull: false,
    },
    calificacion: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
      comment: "Calculado con todas las Calificaciones y sus pesos",
    },
    id_tienda: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(160),
      allowNull: true,
      defaultValue: null,
      comment:
        "Guardar el String de la dirección del cliente en ese momento. En manual es digitada",
    },
    valor_comision: {
      type: DataTypes.DECIMAL(11, 3),
      allowNull: false,
      defaultValue: 0.0,
      comment: "Es el valor de la comisión calculado segun la utilidad",
    },
    id_user: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      comment: "Cliente",
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "pedidos",
    timestamps: false,
    comment:
      "Son los Pedidos hechos por el Cliente, con la información Resumen y directa",
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);


