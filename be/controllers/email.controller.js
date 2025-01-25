const jwt = require('jsonwebtoken');
const validator = require('validator');
const emailServices = require('../services/email.services');

const emailController = {
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
    }
}

module.exports = emailController;