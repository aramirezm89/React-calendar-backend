const express = require('express');
require("dotenv").config();
const cors = require("cors");
const dbConecction = require("./DB/config");

//crearServidor

const app = express();

//conexion base de dato

dbConecction();

//lectura y parseo del body de la request

app.use(express.json());


//cors
app.use(cors())

//public directory

app.use(express.static('public'));
//routes

app.use('/api/auth',require('./routes/auth.routes'));
app.use('/api/calendar',require('./routes/calendar.routes'));

//configuracion del puerto en el que trabajara el servidor
app.listen(process.env.PORT,() =>{ console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)} )