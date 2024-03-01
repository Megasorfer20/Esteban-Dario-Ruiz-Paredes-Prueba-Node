import { Router } from "express"; // Importa la función Router de la biblioteca express.
import {postParameter} from "../controller/post.controller.js" // Importa la función postParameter del controlador post.controller.js.
import { getsParameter } from "../controller/gets.controllers.js"; // Importa la función getsParameter del controlador gets.controllers.js.

const router = Router(); // Crea una nueva instancia de Router.

router.post("/:parameter", postParameter); // Define una ruta POST que acepta cualquier parámetro en la URL y utiliza la función postParameter para manejar la solicitud.
router.get("/:parameter", getsParameter) // Define una ruta GET que acepta cualquier parámetro en la URL y utiliza la función getsParameter para manejar la solicitud.

export default router; // Exporta el router para ser utilizado en otras partes de la aplicación.
