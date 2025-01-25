const companyService = require('../services/company.service')

const companyController = {
    createCompany: async (req, res)=>{
        try {
            const createdBy = req.user;
            const { nameCompany, nib } = req.body;
            if (!nameCompany || !nib) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }
            await companyService.createCompany(nameCompany, nib, createdBy);
            res.status(201).json({ message: 'Company created' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = companyController