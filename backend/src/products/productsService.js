const productModel = require('./productsModel');

module.exports.getDataFromDBService = async () => {
    try {
        const result = await productModel.find({});
        return result;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
};

module.exports.createProductDBService = async (productDetails) => {
    try {
        const productModelData = new productModel();

        productModelData.name = productDetails.name;
        productModelData.imagem = productDetails.imagem;
        productModelData.preco = productDetails.preco;
        productModelData.visualizacoes = 0;

        await productModelData.save();
        return true;
    } catch (error) {
        console.error('erro ao salvar produto:', error);
        return false;
    }
};

module.exports.updateProductDBService = async (id, productDetails) => {
    try {
        await productModel.findByIdAndUpdate(id, productDetails);
        return true;
    } catch (error) {
        console.error('erro ao salvar produto:', error);
        return false;
    }
};