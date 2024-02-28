import { getConnection, declarationDB } from "../database/dbconection.js";
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
import {
  existValidation,
  lenghtValidation,
  uniqueValidation,
  numberValdation,
} from "../middlewares/validations.js";

export const postParameter = async (req, res) => {
  const sequelize = declarationDB();
  try {
    getConnection();
    const { parameter } = req.params;
    let elementWillInsert;
    let newElement;

    if (parameter === "productos") {
      elementWillInsert = await validateProductos(req.body);
      console.log(elementWillInsert);
      newElement = await Productos.create(elementWillInsert);
    }

    if (parameter === "tiendaProducto") {
      elementWillInsert = await validateTiendaProducto(req.body);
      console.log(elementWillInsert);
      newElement = await TiendasProductos.create(elementWillInsert);
    }

    if (parameter === "carrito") {
      elementWillInsert = await agregarCarrito(req.body, req.query);
      console.log(elementWillInsert);
      newElement = await Carritos.create(elementWillInsert);
    }

    if (parameter === "carrito") {
      elementWillInsert = await agregarCarrito(req.body, req.query);
      console.log(elementWillInsert);
      newElement = await Carritos.create(elementWillInsert);
    }

    await res.status(201).json(newElement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    sequelize.close();
  }
};

const validateProductos = async (content) => {
  const {
    estado,
    kit,
    barcode,
    nombre,
    presentacion,
    descripcion,
    foto,
    peso,
  } = content;
  if (!nombre || !barcode || !presentacion) {
    throw new Error(`Campo vacío, por favor rellenar todos los campos`);
  } else {
    const values = {
      estado: estado ? estado : 1,
      kit: kit ? kit : 0,
      barcode: await uniqueValidation("barcode", Productos, barcode),
      nombre: await lenghtValidation(nombre, 60),
      presentacion: await lenghtValidation(presentacion, 25),
      descripcion: descripcion ? descripcion : null,
      foto: foto ? foto : null,
      peso: peso ? peso : 0.0,
    };
    return values;
  }
};

const validateTiendaProducto = async (content) => {
  const { compra_maxima, valor, id_promocion, id_tienda, id_producto } =
    content;
  if (!id_producto || !id_tienda || !valor || !compra_maxima) {
    throw new Error(`Campo vacío, por favor rellenar todos los campos`);
  } else {
    const validatedCompraMaxima = await numberValdation(compra_maxima);
    const validateValor = await numberValdation(valor);
    if (validatedCompraMaxima <= 0 || validateValor <= 0) {
      throw new Error(`El valor debe ser mayor o igual a 1`);
    }
    const values = {
      id_producto: await existValidation("id", Productos, id_producto),
      id_tienda: await existValidation("id", Tiendas, id_tienda),
      id_promocion: id_promocion ? id_promocion : null,
      valor: validateValor,
      compra_maxima: validatedCompraMaxima,
    };
    return values;
  }
};

const agregarCarrito = async (content, query) => {
  const { uId, tpId } = query;
  const { cantidad } = content;

  const ids = await TiendasProductos.findOne({
    where: { id: tpId },
    attributes: ["id_producto", "id_tienda", "compra_maxima"],
  });

  const validatedUserId = await numberValdation(uId);
  const validateProductoId = await numberValdation(ids.id_producto);
  const validateTiendaId = await numberValdation(ids.id_tienda);
  const validateCantidad = await numberValdation(cantidad);
  if (
    validatedUserId <= 0 ||
    validateProductoId <= 0 ||
    validateTiendaId <= 0 ||
    validateCantidad <= 0
  ) {
    throw new Error(`El valor debe ser mayor o igual a 1`);
  }

  if (ids.compra_maxima > validateCantidad) {
    throw new Error(`La cantidad debe ser menor que ${ids.compra_maxima}`);
  } else {
    const dataCarrito = {
      cantidad: validateCantidad,
      id_producto: validateProductoId,
      id_tienda: validateTiendaId,
      id_user: validatedUserId,
      created_at: new Date(),
    };

    return dataCarrito;
  }
};
