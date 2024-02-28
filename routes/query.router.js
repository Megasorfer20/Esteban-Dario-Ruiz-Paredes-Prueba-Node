import { Router } from "express";
import {postParameter} from "../controller/post.controller.js"
import {listProducts} from "../controller/listProducts.controller.js"
import { agregarCarrito } from "../controller/carrito.controller.js";

const router = Router();

router.post("/newElement/:parameter", postParameter);
router.get("/tiendaProductos/:idTienda", listProducts);
router.post("/carritoNew/:tiendaProductoId", agregarCarrito)

export default router;
