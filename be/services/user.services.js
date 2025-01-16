const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const userServices = {
    register: async ({fullName, email, password}) => {
        if (await Users.findOne({ email })) throw new Error('Email is already taken'); 

        const hash = await bcrypt.hash(password, 10);
        const newUser = new Users({
            fullName,
            email,
            password: hash
        });
        await newUser.save();
    },

    login: async ({email, password}) => {
        const user = await Users.findOne({ email });
        if (!user) throw new Error('User is not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Password is not valid');

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return { token };
    },
    
    resetPassword: async ({email, password}) => {
        const hash = await bcrypt.hash(password, 10);
        await Users.findOneAndUpdate({
            email
        }, {
            password: hash
        });
    }
}

module.exports = userServices;