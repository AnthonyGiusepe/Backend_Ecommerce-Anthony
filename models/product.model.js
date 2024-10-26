const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 80
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        default: true
    }
    // updatedAt: {
    //     type: Date,
    //     default: Date.now()
    // }
})

module.exports = mongoose.model('Product', userSchema)