import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { Tiendas } from "./tiendas.model.js";
import { Promociones } from "./promociones.model.js";
import { Productos } from "./productos.model.js";

const sequelize = declarationDB();

export const TiendasProductos = sequelize.define(
  "tiendas_productos",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    compra_maxima: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      defaultValue: 1.0,
    },
    valor: {
      type: DataTypes.DECIMAL(11, 3),
      allowNull: false,
      comment: "Valor de venta más actual",
    },
    id_promocion: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    id_tienda: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "tiendas_productos",
    timestamps: false,
    comment: "Son los Productos que están disponibles para un Cedis",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);

TiendasProductos.belongsTo(Promociones, {
  foreignKey: "id_promocion",
  targetKey: "id",
});
TiendasProductos.belongsTo(Tiendas, {
  foreignKey: "id_tienda",
  targetKey: "id",
});
TiendasProductos.belongsTo(Productos, {
  foreignKey: "id_producto",
  targetKey: "id",
});
