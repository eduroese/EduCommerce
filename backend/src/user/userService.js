const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.createUserDBService = async (userDetails) => {
    try {

        const existingUser = await userModel.findOne({userDetails});
        if (existingUser) {
            console.log('usuario já cadastrado');
            return false;
        }

        const hashedPassword = await bcrypt.hash(userDetails.password, 10);

            const userModelData = new userModel();
    
            userModelData.name = userDetails.name;
            userModelData.email = userDetails.email;
            userModelData.password = hashedPassword;
            userModelData.imagem = userDetails.imagem;
            userModelData.saldo = userDetails.saldo;
    
            await userModelData.save();
            return true;
        } catch (error) {
            console.error('erro ao criar usuario:', error);
            return false;
        }
};

module.exports.loginUserDBService = async (email, password) => {
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            console.error('Usuário não encontrado');
            return false;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.error('Senha incorreta');
            return false;
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {user:{ name: user.name, email: user.email, imagem: user.imagem, saldo: user.saldo },token};
    } catch (error) {
        console.error('Erro ao tentar logar o usuário:', error);
        return false;
    }
};