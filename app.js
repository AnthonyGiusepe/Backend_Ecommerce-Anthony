const express = require ('express');
const app = express();
const cors = require('cors')

const userRoutes = require('./routes/user.routes')
const productsRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes')

app.use( cors())

app.use(express.static('public'))

app.use(express.json())


//dentro de un array porque vamos a usar varias rutas
app.use([userRoutes, productsRoutes, categoryRoutes, orderRoutes])


module.exports = app

// app.get('/users', (req, res) => {
//     return res.send("Usuarios obtenidos")
// })

// app.post('/users', (req, res) => {
//     return res.send("Usuarios obtenidos")
// })