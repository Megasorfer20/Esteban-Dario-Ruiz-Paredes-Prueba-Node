import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { Pedidos } from "./pedidos.model.js";

const sequelize = declarationDB();

export const PedidoEstados = sequelize.define(
  "pedidos_estados",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      comment:
        "1=Creado 2=Confirmado 3=Enviado 4=Finalizado 25=Rechazado 26=Cancelado Tienda 27=Cancelado Cliente 31=Reclamo 32=Reclamo Finalizado 33=Soporte 34=Soporte Finalizado",
      validate: {
        isIn: [[1, 2, 3, 4, 25, 26, 27, 31, 32, 33, 34]],
      },
    },
    id_pedido: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "pedidos_estados",
    timestamps: false,
    comment: "Es el Historial de los Estados de un Pedido",
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);
