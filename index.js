//npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
//npm i express
//npm i faker (data fake para productos)
//npm i faker@5.5.3 -S (version funcional)
//npm i @hapi/boom (Manejo de errores)
//npm i joi (validacion de datos)
//npm i cors (permitir peticiones de otro origen)
//npm docs libreria

const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {logErrors,errorHandler,boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port =process.env.PORT || 3000;

//Midelware para capturar con json
app.use(express.json());

//Midelware para usar cors
const whitelist = ['http://localhost:8080','http://127.0.0.1:5500'];
const options = {
    origin: (origin,callback)=>{
      if (whitelist.includes(origin) || !origin){
        callback(null,true);
      }else{
        callback(new Error('Acceso no permitido'));
      }
    }
}
app.use(cors(options));
app.get('/',(req,res)=>{
  res.send('Hello mi server in express');
})

app.get('/nueva-ruta',(req,res)=>{
  res.send('Hola soy una nueva ruta');
})

routerApi(app);
//cargar middlewares despues de el router
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log('My port' + port);
});
