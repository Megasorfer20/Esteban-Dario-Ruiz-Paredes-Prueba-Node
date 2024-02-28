import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { Tiendas } from "./tiendas.model.js";
import { Users } from "./users.model.js";
import { Productos } from "./productos.model.js";

const sequelize = declarationDB();

export const Carritos = sequelize.define(
  "carritos",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    cantidad: {
      type: DataTypes.DECIMAL(9, 3),
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_tienda: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      comment: "Cliente Comprador",
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "carritos",
    timestamps: false,
    comment: "Son los Productos agregados al Carrito de Compras de un Cliente",
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);
