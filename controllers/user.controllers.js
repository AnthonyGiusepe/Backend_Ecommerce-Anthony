// Funciones para manejar distintas peticiones
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET


async function getUsers(req, res) {

    try {

        const users = await User.find()

        console.log(users)

        return res.status(200).send(users)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener usuarios")
    }
}

async function createUser(req, res) {

    if (!req.body.password) {
        return res.status(400).send({
            ok: false,
            message: "La contraseña es requerida"
        })
    }

    const user = new User(req.body)

    bcrypt.hash(user.password, saltRounds, (error, hash) => {
        if (error) {
            return res.status(500).send({
                ok: false,
                message: "Error al crear usuario"
            })
        }

        user.password = hash

        user.save().then((nuevoUser) => {

            console.log(nuevoUser)
            return res.status(201).send(nuevoUser)

        }).catch(error => {
            console.log(error)
            return res.send('El usuario no se pudo crear')
        })

        // res.send("Creacion de usuario en progreso")

    })


}

async function getUserById(req, res) {

    try {

        const { id } = req.params

        if(req.user.role !== "admin" && id !== req.user._id){
            return res.status(403).send({
                message: "No tienes permisos para acceder a este usuario"
            })
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send({
                message: "el usuario no fue encontrado",
                ok: false
            })
        }

        user.password = undefined

        return res.status(200).send({
            ok: true,
            message: "usuario",
            user: user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener usuario en la DB")
    }
}

async function deleteUser(req, res) {

    try {

        const { id } = req.params

        const deleteUser = await User.findByIdAndDelete(id)

        return res.status(200).send({
            ok: true,
            message: "El usuario fue borrado correctamente",
            deleteUser: deleteUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el usuario"
        })
    }

}

async function updateUser(req, res) {

    if (!req.body.password) {
        return res.status(400).send({
            ok: false,
            message: "La contraseña es requerida"
        })
    }

    try {

        const { id } = req.params

        if(req.user.role !== "admin" && id !== req.user._id){
            return res.status(403).send({
                message: "No tienes permiso para actualizar este usuario"
            })
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true })

        bcrypt.hash(updateUser.password, saltRounds, (error, hash) => {
            if (error) {
                return res.status(500).send({
                    ok: false,
                    message: "Error al crear usuario"
                })
            }

            updateUser.password = hash

            updateUser.save().then((updateUser) => {

                return res.status(201).send({
                    ok: true,
                    message: "Update User",
                    updateUser: updateUser
                })

            }).catch(error => {
                console.log(error)
                return res.send('El usuario no se pudo actualizar')
            })

            // res.send("Creacion de usuario en progreso")

        })

    } catch (error) {

        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar usuario"
        })

    }
}

async function login(req, res) {

    try {
        const { email, password } = req.body
        console.log(email, password)

        if(!email || !password) {
            return res.status(400).send({
                message: "Email y contraseña son requeridos"
            })
        }

        const user = await User.findOne({ email })

        console.log(user)

        if(!user){
            return res.status(400).send({
                message: "Alguno de los datos es incorrecto"
            })
        }

        const match = await bcrypt.compare(password, user.password)
        
        if(!match){
            return res.status(400).send({
                message: "Alguno de los datos es incorrecto"
            })
        }

        user.password = undefined
        user.__v = undefined

        const token = jwt.sign(user.toJSON(), SECRET, {
            expiresIn: '1h'
        })

        console.log(token)

        return res.send({
            message: "Login exitoso",
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send( { message: "Error al autenticar usuario "})
        
    }
    
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    login
}