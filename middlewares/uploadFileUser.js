const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: 'public/images/users', 
    filename: (req, file, cb) => {

        const name = crypto.randomUUID()

        console.log(file)

        const filename = name + path.extname(file.originalname)

        // if(file.size > 1024){
        //     cb(new Error('File is too large'), false)
        // }

        cb(null, filename)

    }
})

const uploadUser = multer({storage}).single('image')

module.exports = uploadUser