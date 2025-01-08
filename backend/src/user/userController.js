const userService = require('./userService');

const createUserControllerfn = async (req, res) =>
    {
        try {
            const status = await userService.createUserDBService(req.body);
    
            if (status) {
                res.status(200).send({
                    status: true,
                    message: 'User created in successfully'
                });
            } else {
                res.status(401).send({
                    status: false,
                    message: 'Invalid information'
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send({
                status: false,
                message: 'Internal server error'
            });
        }
    }

const loginUserControllerfn = async (req, res) =>
    {
        const { email, password } = req.body;
        try {
            const token = await userService.loginUserDBService(email, password);
    
            if (token) {
                res.status(200).send({
                    status: true,
                    message: 'User logged in successfully',
                    token: token.token,
                    user: token.user
                });
            } else {
                res.status(401).send({ status: false, message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send({
                status: false,
                message: 'Internal server error'
            });
        }
    }
    module.exports = {loginUserControllerfn, createUserControllerfn};