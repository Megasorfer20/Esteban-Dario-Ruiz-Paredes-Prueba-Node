// Importamos los modelos de la base de datos

import { Carritos } from "../models/carritos.model.js";
import { Pedidos } from "../models/pedidos.model.js";
import { PedidoEstados } from "../models/pedidosEstados.model.js";
import { PedidosProductos } from "../models/pedidosProductos.model.js";
import { Productos } from "../models/productos.model.js";
import { Promociones } from "../models/promociones.model.js";
import { TiendasDistanias } from "../models/tiendaDistancia.model.js";
import { Tiendas } from "../models/tiendas.model.js";
import { TiendasProductos } from "../models/tiendasProductos.model.js";
import { TiendasPromociones } from "../models/tiendasPromociones.model.js";
import { UserClientes } from "../models/userClientes.model.js";
import { UsersDirecciones } from "../models/userDirecciones.model.js";
import { Users } from "../models/users.model.js";

// Esta función sincroniza los modelos con la base de datos y establece las relaciones entre ellos

export const inicializationModels = async () => {
  // Sincronizamos cada modelo con la base de datos
  await Carritos.sync();
  await Pedidos.sync();
  await PedidoEstados.sync();
  await PedidosProductos.sync();
  await Productos.sync();
  await Promociones.sync();
  await TiendasDistanias.sync();
  await Tiendas.sync();
  await TiendasProductos.sync();
  await TiendasPromociones.sync();
  await UserClientes.sync();
  await UsersDirecciones.sync();
  await Users.sync();

  // Establecemos las relaciones entre los modelos
  // Cada relación se define en términos de pertenencia (belongsTo) o propiedad (hasMany)

  Carritos.belongsTo(Tiendas, {
    foreignKey: "id_tienda",
    targetKey: "id",
  });
  Carritos.belongsTo(Users, {
    foreignKey: "id_user",
    targetKey: "id",
  });
  Carritos.belongsTo(Productos, {
    foreignKey: "id_producto",
    targetKey: "id",
  });
  Pedidos.belongsTo(Tiendas, {
    foreignKey: "id_tienda",
    targetKey: "id",
  });
  Pedidos.belongsTo(Users, {
    foreignKey: "id_user",
    targetKey: "id",
  });
  PedidoEstados.belongsTo(Pedidos, {
    foreignKey: "id_pedido",
    targetKey: "id",
  });
  Pedidos.hasMany(PedidoEstados, {
    foreignKey: "id_pedido",
    sourceKey: "id",
  });
  Pedidos.hasMany(PedidosProductos, {
    foreignKey: "id_pedido",
    sourceKey: "id",
  });
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
  Promociones.hasMany(TiendasPromociones, {
    foreignKey: "id_promocion",
    sourceKey: "id",
  });
  TiendasDistanias.belongsTo(Tiendas, {
    foreignKey: "id_tienda",
    targetKey: "id",
  });
  Tiendas.hasMany(TiendasDistanias, {
    foreignKey: "id_tienda",
    sourceKey: "id",
    as: "tiendas_distancias",
  });
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
  TiendasPromociones.belongsTo(Tiendas, {
    foreignKey: "id_tienda",
    targetKey: "id",
  });
  TiendasPromociones.belongsTo(Promociones, {
    foreignKey: "id_promocion",
    targetKey: "id",
  });
  Users.hasMany(UsersDirecciones, { foreignKey: "id_user", sourceKey: "id" });
  UserClientes.belongsTo(Users, { foreignKey: "id_user", targetKey: "id" });
  UsersDirecciones.hasMany(UserClientes, {
    foreignKey: "id_direccion",
    sourceKey: "id",
  });
  UserClientes.belongsTo(UsersDirecciones, {
    foreignKey: "id_direccion",
    targetKey: "id",
  });

  UsersDirecciones.belongsTo(Users, { foreignKey: "id_user", targetKey: "id" });
};
