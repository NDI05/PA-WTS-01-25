const userServices = require('../services/user.services');
const emailServices = require('../services/email.services');
const redisClient = require('../helpers/configRedis.helper');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const validator = require('validator');

const userController = {
    register: async (req, res) => {
        try {
            const { fullName, email, password, role, departement, idCompany } = req.body;
            if (!fullName || !email || !password || !role) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }
            
            if (role !== "officer" && role !== "enterpreneur") {
                return res.status(400).json({ message: 'Role is not valid' });
            }

            if (role === "officer" && !departement) {
                return res.status(400).json({ message: 'Departement is required' });
            }

            if (role === "enterpreneur" && !idCompany) {
                return res.status(400).json({ message: 'Id Company is required' });
            }
            
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Email is not valid' });
            }

            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters' });
            }
            await userServices.register({ fullName, email, password, role, idCompany, departement });

            res.status(200).json({ message: 'Register success' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }

            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Email is not valid' });
            }
            
            const user = await userServices.login({ email, password });

            const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

            if(!await redisClient.set(`token:${user._id}`, token, 'EX', 3600)){
                throw new Error('Failed to save token to redis');
            }
            res.setHeader('Authorization',  `Bearer ${token}`);
            res.status(200).json({ message: 'Login success' });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const token = req.query.token;
            if (!token) {
                return res.status(400).json({ message: 'Token is required' });
            }
            const { password, confirmPassword } = req.body;
            if (!password || !confirmPassword) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Password is not match' });
            }
            const { email } = jwt.verify(token, process.env.JWT_SECRET);
            await userServices.resetPassword({ email, password });
            res.status(200).json({ message: 'Password has been reset' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // getUser: async (req, res) => {
    //     try {
    //         const _id = req.user;
    //         const users = await userServices.getUser({_id});
    //         res.status(200).json({ users });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }
}

module.exports = userController;