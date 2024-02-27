import { DataTypes } from "sequelize";
import { declarationDB } from "../database/dbconection.js";
import { Users } from "./users.model.js";

const sequelize = declarationDB();

export const UsersDirecciones = sequelize.define(
  "users_direcciones",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "Nombre del lugar. Oficina, Casa, Trabajo",
    },
    direccion: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    distancia: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "users_direcciones",
    timestamps: false,
    comment:
      "Son todas las direcciones del Cliente, disponibles para reemplazar la principal",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);

UsersDirecciones.belongsTo(Users, { foreignKey: "id_user", targetKey: "id" });
