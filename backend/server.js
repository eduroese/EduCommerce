const express = require ('express');
const server = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const cors = require('cors');

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@educommerce.cesy4.mongodb.net/?retryWrites=true&w=majority&appName=EduCommerce
`) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}
connectDB();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8000, function check (error) {
    if(error)
    {
        console.log("error")
    }else{
        console.log("success");
    }
});
