const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    imagem: {type: String, required: true},
    preco: {type: Number, required: true},
    visualizacoes: {type: Number, required: false},
})

module.exports = mongoose.model('Products', productSchema);