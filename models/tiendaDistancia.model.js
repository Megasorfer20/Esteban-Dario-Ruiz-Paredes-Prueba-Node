import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { Tiendas } from "./tiendas.model.js";

const sequelize = declarationDB();

export const TiendasDistanias = sequelize.define(
  "tiendas_distranias",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    id_tienda: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    valor: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    desde: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    hasta: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      comment:
        "Null= +nn mt. Se usa para dar valor cuando la distancia sobre pasa la distancia mayor",
    },
  },
  {
    tableName: "tiendas_distranias",
    timestamps: false,
    comment:
      "Son los valores de Domicilio o Envío de una Tienda, respecto a la distancia con el Cliente",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);

TiendasDistanias.belongsTo(Tiendas, {
  foreignKey: "id_tienda",
  targetKey: "id",
});
