const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

function validation(req, res, next){

    // const token = req.headers.authorization.split(" ")[1]

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send({
            message: "No tiene Autorización para acceder a este endpoint"
        })
    }

    jwt.verify(token, SECRET, (error, payload)=>{

        if(error){
            console.log(error)
            return res.status(401).send({
                message: "Las credenciales no son correctas"
            })
        }

        console.log(payload)

        req.user= payload

        //Continuar a la siguiente funcion
        next()
    })

    console.log(token)

}

module.exports = validation