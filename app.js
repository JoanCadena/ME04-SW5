const express = require("express");
const cors = require('cors');
const config = require('./config')

//Inicializar la libreria
const app = express();
app.use(express.json());

//Implementación de CORS
app.use(cors());

//Información que se obtendrá en nuestra URL principal.
app.get("/services", (req, res) => {
  res.send("API Servicios ME04SW5");
});

//Importar las rutas con los endpoints especificos
//const rutas_compromisos = require("./routes/Crear_compromiso");
//app.use(rutas_compromisos);

//Puerto
const PORT = config.PORT || 3001;

//Levantar el servidor para escuchar los puertos
app.listen(PORT, () => {
  console.log(`Listen to API in http://localhost:${PORT}`);
});
