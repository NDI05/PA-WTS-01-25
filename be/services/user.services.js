const bcrypt = require('bcrypt');
const Users = require('../models/users/users.model');
const DetailOfficer = require('../models/users/detailOfficer.model');
const DetailEnterpreneur = require('../models/users/detailEntrepreneur.model');
const Company = require('../models/company.model')

const userServices = {
    register: async ({fullName, email, password, role, idCompany, departement}) => {
        if (await Users.findOne({ email })) throw new Error('Email is already taken'); 

        if (role === 'officer') {
            if (!departement) {
                throw new Error('Departement is required');
            }

            const hash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                fullName,
                email,
                password: hash,
                role
            });
            await newUser.save();

            const newOfficer = new DetailOfficer({
                idUser: newUser._id,
                departement
            });
            await newOfficer.save();

        }else{
            const nib = await Company.findOne({nib: idCompany});
            if (!nib || nib === null) {
                throw new Error('Company is not found');
            }

            if ((await DetailEnterpreneur.find({idCompany: nib._id})).length >= 2) {
                throw new Error('This Company Is Full')
            }

            const hash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                fullName,
                email,
                password: hash,
                role
            });
            await newUser.save();

            const newEnterpreneur = new DetailEnterpreneur({
                idUser: newUser._id,
                idCompany: nib._id
            });
            await newEnterpreneur.save();
        }
    },

    login: async ({email, password}) => {
        const user = await Users.findOne({ email });
        if (!user) throw new Error('User is not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Password is not valid');

        return user;
    },
    
    resetPassword: async ({email, password}) => {
        const hash = await bcrypt.hash(password, 10);
        await Users.findOneAndUpdate({
            email
        }, {
            password: hash
        });
    },

    // getUser: async ({_id}) => {
    //     const user = await Users.findOne({_id});
    //     if (!user) throw new Error('User is not found');
    //     return user;
    // }
}

module.exports = userServices;