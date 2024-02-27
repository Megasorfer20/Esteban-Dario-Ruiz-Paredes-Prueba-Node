import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { Pedidos } from "./pedidos.model.js";
import { Productos } from "./productos.model.js";
import { Promociones } from "./promociones.model.js";

const sequelize = declarationDB();

export const PedidosProductos = sequelize.define(
  "pedidos_productos",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    cantidad: {
      type: DataTypes.DECIMAL(9, 3),
      allowNull: false,
    },
    valor_unitario: {
      type: DataTypes.DECIMAL(11, 3).UNSIGNED,
      allowNull: false,
      comment: "Valor en _productos_",
    },
    valor_unitario_promocion: {
      type: DataTypes.DECIMAL(11, 3).UNSIGNED,
      allowNull: false,
      comment:
        "Valor en _productos_ si tiene promo _valor_promo_ si no tiene _valor_",
    },
    total_teorico: {
      type: DataTypes.DECIMAL(12, 3).UNSIGNED,
      allowNull: false,
    },
    total_final: {
      type: DataTypes.DECIMAL(12, 3).UNSIGNED,
      allowNull: false,
      comment: "Se usa siempre, y es por motivo de si llega a haber promoción",
    },
    id_promocion: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: true,
      comment: "La promoción de como se vendió",
      defaultValue: null,
    },
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "Null = Se borró el producto después",
      defaultValue: null,
    },
    id_pedido: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "pedidos_productos",
    timestamps: false,
    comment: "Son los Productos asociados a un Pedido",
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

PedidosProductos.belongsTo(Pedidos, {
  foreignKey: "id_pedido",
  targetKey: "id",
});
PedidosProductos.belongsTo(Promociones, {
  foreignKey: "id_promocion",
  targetKey: "id",
});
PedidosProductos.belongsTo(Productos, {
  foreignKey: "id_producto",
  targetKey: "id",
});
