import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { Tiendas } from "./tiendas.model.js";
import { Promociones } from "./promociones.model.js";

const sequelize = declarationDB();

export const TiendasPromociones = sequelize.define(
  "tiendas_promociones",
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
      validate: {
        isIn: [[0, 1]],
      },
      comment: "0=Inactivo 1=Activo",
    },
    inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    id_tienda: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    id_promocion: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "tiendas_promociones",
    timestamps: false,
    comment: "Son las fechas de vigencia de una Promoción para un Cedis",
    engine: "InnoDB",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

TiendasPromociones.belongsTo(Tiendas, {
  foreignKey: "id_tienda",
  targetKey: "id",
});
TiendasPromociones.belongsTo(Promociones, {
  foreignKey: "id_promocion",
  targetKey: "id",
});
