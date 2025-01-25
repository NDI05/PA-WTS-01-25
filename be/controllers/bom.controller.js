const bomService = require('../services/bom.services');

const bomController ={
    createBom: async (req, res) => {
        try {
            const createdBy = req.user;
            const { bomName, detailBom } = req.body;
            if (!bomName || !detailBom) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            await bomService.createBom({ bomName, createdBy, detailBom });
            res.status(201).json({ message: 'Bom created' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getBom: async (req, res) => {
        try {
            const _id = req.user;
            const boms = await bomService.getBom(_id);
            res.status(200).json(boms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = bomController;