const productsService = require('./productsService');

const getDataControllerfn = async (req, res) =>
{
    const productDetails = await productsService.getDataFromDBService();
    res.send({ "status": true, "data": productDetails })
}

const createProductControllerfn = async (req, res) =>
    {
        const status = await productsService.createProductDBService(req.body);
        if(status){
            res.send({"status": true, "message": "Product created successfully"});
        }else{
            res.send({"status": false, "message": "error"});
        }
    }

    const updateProductControllerfn = async (req, res) =>
        {
            const status = await productsService.updateProductDBService(req.params.id,req.body);
            if(status){
                res.send({"status": true, "message": "Product updated successfully"});
            }else{
                res.send({"status": false, "message": "error when updating"});
            }
        }

module.exports = {getDataControllerfn, createProductControllerfn, updateProductControllerfn};