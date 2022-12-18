const mongoose = require('mongoose');

const dbConecction = async () =>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_CONNECTIONSTRING);
        console.log('DB online')
    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexión a la base de datos')
    }
}

module.exports = dbConecction