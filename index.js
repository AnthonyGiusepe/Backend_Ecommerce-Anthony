// const express = require('express')
// const app = express()
require('dotenv').config()

const app = require('./app')
const reset = "\x1b[0m"

const mongoose = require('mongoose')

const DATABASE_URL = process.env.MONGO_URI

// app.get('/', (req, res)=>{
//     res.send("Hola Mundo!")
// })

// app.post("/products", (req, res) => {
//     res.send("Creando un producto")
// })


mongoose.connect(DATABASE_URL).then(()=>{

    console.log(`\x1b[33m Conexion a la DB exitosa ${reset}`)

    app.listen(process.env.PORT, ()=> {
        console.log(`\x1b[35m Server is running on port ${process.env.PORT} ${reset}`)
    })

}).catch(err => console.log(err, 'Error al conectar al DB'))


