const userServices = require('../services/user.services');
const emailServices = require('../services/email.services');
const redisClient = require('../helpers/configRedis.helper');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const validator = require('validator');

const userController = {
    register: async (req, res) => {
        try {
            const { fullName, email, password, role } = req.body;
            if (!fullName || !email || !password || !role) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }
            
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Email is not valid' });
            }

            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters' });
            }
            await userServices.register({ fullName, email, password, user });

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
    sendResetPassword: async (req, res) =>{
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Email is not valid' });
            }
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const link = `${process.env.BASE_URL}/api/users/reset-password?token=${token}`;
            const subject = 'Reset Password';
            const text = `Click ${link} to reset your password`;
            const html = `Click <a href="${link}">here</a> to reset your password`;

            await emailServices.sendEmail({ email, subject, text, html });
            
            res.status(200).json({ message: 'Email has been sent' });
        } catch (error) {
            res.status(500).json({message: error.message})
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
    getUser: async (req, res) => {
        try {
            const _id = req.user;
            const users = await userServices.getUser({_id});
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;