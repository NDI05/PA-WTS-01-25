const Company = require('../models/company.model');
const Users = require('../models/users/users.model');

const companyService ={
    createCompany: async (nameCompany, nib, createdBy) => {
        const role = await Users.findOne({ _id: createdBy })
        if (role.role !== 'officer') {
            throw new Error('You are not authorized to create a company');
        }
        if (await Company.findOne({nib})){
            throw new Error('Company is already exist');
        }
        const company = new Company({
            nameCompany,
            nib,
            createdBy
        });
        await company.save();
    }
}

module.exports = companyService;