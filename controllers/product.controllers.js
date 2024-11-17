const Product = require('../models/product.model.js');

async function getProducts(req, res) {

    try {

        const limit = parseInt(req.query.limit) || 5
        const skip = parseInt(req.query.skip) || 0

        const filter = []

        if (req.query.name) {
            filter.push({ name: { $regex: req.query.name, $options: 'i' } })
        }

        if (req.query.min_price) {
            filter.push({ price: { $gte: req.query.min_price } })
        }

        const query = filter.length > 0 ? { $and: filter } : {}

        // const products = await Product.find(query)

        const products = await Product.find(query)
                                        .select({ __v: 0 })
                                        .sort({ price: 1}) //forma decendente o ascendente 1 o -1
                                        .collation({ locale: "es"}) // no diferencie entre mayus o minuscula
                                        .limit(limit)
                                        .skip(limit * skip)

        const total = await Product.countDocuments(query)

        // if(filter.length === 0){
        //     const products = await Product.find()
        // }else{
        //     const products = await Product.find({ $and: filter})
        // }



        // const queryName= req.query.name || ''



        // const products = await Product.find({
        //     $and: [

        //         { name: { $regex: "Label", $options: 'i' } },
        //         { price: { $gte: 800 } },
        //         { active: true}

        //     ]
        // })


        // Precios mayor o igual a 1000

        // const products = await Product.find({
        //     price: { $gte: 1000}
        // })

        // Precios menor o igual a 1000

        // const products = await Product.find({
        //     price: { $lte: 1000}
        // })

        console.log(products)

        return res.status(200).send({
            message: "Productos obtenidos correctamente",
            product: products,
            total
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error al obtener productos"
        })
    }

}

async function createProducts(req, res) {

    try {
        const product = new Product(req.body)

        if (req.file) {
            product.image = req.file.filename
        }

        const newProduct = await product.save()

        return res.status(201).send({
            message: "Producto creado correctamente",
            product: newProduct
        })

    } catch (error) {
        console.log(error)
        return res.send('El producto no se pudo crear')
    }

    // const product = new Product(req.body)

    // product.save().then((nuevoProduct) => {

    //     console.log(nuevoProduct)
    //     return res.status(201).send({
    //         message: "Producto creado correctamente",
    //         product: nuevoProduct
    //     })

    // }).catch(error => {
    //     console.log(error)
    //     return res.send('El producto no se pudo crear')
    // })

}

async function getProductById(req, res) {

    try {
        
        const { id } = req.params

        if(req.user.role !== "admin" && id !== req.user._id){
            return res.status(403).send({
                message: "No tienes permisos para acceder a este producto"
            })
        }

        const products = await Product.findById(id)
        

        if (!products) {
            return res.status(404).send({
                message: "el Producto no fue encontrado",
                ok: false
            })
        }

        return res.status(200).send({
            ok: true,
            message: "Producto",
            Product: products
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener el producto solicitado"
        })
    }
}

async function deleteProduct(req, res) {

    try {

        const { id } = req.params

        if(req.user.role !== "admin" && id !== req.user._id){
            return res.status(403).send({
                message: "No tienes permisos para acceder a este producto"
            })
        }

        const deleteProduct = await Product.findByIdAndDelete(id)

        return res.status(200).send({
            ok: true,
            message: "El Producto fue borrado correctamente",
            deleteProduct: deleteProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el producto"
        })
    }

}

async function updateProduct(req, res) {

    const { id } = req.params

    if(req.user.role !== "admin" && id !== req.user._id){
        return res.status(403).send({
            message: "No tienes permisos para acceder a este producto"
        })
    }

    const updateProduct = await Product.findByIdAndUpdate(id, req.body, { new: true } )

    updateProduct.save().then((updateProduct) => {

        return res.status(201).send({
            ok: true,
            message: "Producto Actualizado",
            updateProduct: updateProduct
        })

    }).catch(error => {
        console.log(error)
        return res.send('No se pudo actualizar el producto')
    })
}

module.exports = {
    getProducts,
    createProducts,
    getProductById,
    deleteProduct,
    updateProduct
}