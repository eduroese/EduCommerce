const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    imagem: {type: String, required: false},
    saldo: {type: Number, required: false},
})

module.exports = mongoose.model('User', userSchema);