// Importamos los módulos necesarios
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "./routes/query.router.js";
import { inicializationModels } from "./database/inicialiceDatabses.controller.js";

// Cargamos las variables de entorno
config();

// Definimos la clase Server
export default class Server {
  constructor() {
    this.app = express(); // Creamos una nueva aplicación Express
    this.port = process.env.PORT; // Definimos el puerto a partir de las variables de entorno
    this.path = "API"; // Definimos el path base para las rutas

    // Inicializamos los middlewares, las rutas y la base de datos
    this.middleware();
    this.routes();
    this.initialization()
  }

  // Definimos los middlewares que se usarán en la aplicación
  middleware() {
    this.app.use(cors()); // Usamos cors para permitir solicitudes de origen cruzado
    this.app.use(express.json()); // Usamos el middleware de express para parsear el cuerpo de las solicitudes a JSON
    this.app.use(express.static("public")); // Servimos archivos estáticos desde la carpeta 'public'
  }

  // Definimos las rutas que se usarán en la aplicación
  routes() {
    this.app.use(`/${this.path}`, router); // Usamos el router importado en el path definido
  }

  // Iniciamos el servidor
  listen() {
    this.app.listen(this.port, () => { // Hacemos que la aplicación escuche en el puerto definido
      console.log(`App running in port ${this.port}`); // Imprimimos un mensaje cuando el servidor se inicia correctamente
    });
  }

  // Inicializamos los modelos de la base de datos
  async initialization () {
    await inicializationModels() // Sincronizamos los modelos con la base de datos
  }
};
