const express = require("express");
// const cors = require("cors");
const { json } = require("express/lib/response");
const bodyParser = require("body-parser");
const globalConstants = require('./const/globalConstants')
const routerConfig = require('./routes/index.routes')

const configuracionApi = (app) => {
  // app.use(cors(corOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return
};

const configuracionRouter = (app) => {
  app.use('/api', routerConfig.rutas_init())
}

const init = () => {
  const app = express(); //Crea una instancia de express
  configuracionApi(app);
  console.log('api configurada');
  configuracionRouter(app)
  console.log('router configurado');

  app.listen(globalConstants.PORT, () => {
    console.log(`Server is running on port: ${globalConstants.PORT}`);
  });
};

init();

// let corOptions = {
//   origin: "https://localhost:3306",
// };

// Router