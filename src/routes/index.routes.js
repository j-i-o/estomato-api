const { Router } = require('express')
const mainRoutes = require("./main.routes.js");
const sexoRoutes = require("./sexo.routes.js");
const pacienteRoutes = require("./paciente.routes.js");
const estadoRoutes = require("./estado.routes.js");
const nombLesionRoutes = require("./nombLesion.routes.js");
const ubicacionRoutes = require("./ubicacion.routes.js");
const lesionRoutes = require("./lesion.routes.js");
const consultaRoutes = require("./consulta.routes.js");

const rutas_init = () => {
  const router = Router()

  router.use('/', mainRoutes)
  router.use('/paciente', pacienteRoutes)
  router.use('/sexo', sexoRoutes)
  router.use("/estado", estadoRoutes);
  router.use("/nombLesion", nombLesionRoutes);
  router.use("/ubicacion", ubicacionRoutes);
  router.use("/lesion", lesionRoutes);
  router.use("/consulta", consultaRoutes);

  return router
}

module.exports = { rutas_init }