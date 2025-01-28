const bomService = require('../services/bom.services');

const bomController ={
    createBom: async (req, res) => {
        try {
            const createdBy = req.user;
            const { idBom, bomName, detailBom, status, idCompanyO} = req.body;
            if (!idBom, !bomName || !detailBom) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            await bomService.createBom({ idBom, bomName, createdBy, detailBom, status, idCompanyO});
            res.status(201).json({ message: 'Bom created' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getBom: async (req, res) => {
        try {
            const _id = req.user;
            const fUser = req.query.fUser;
            const fCompany = req.query.fCompany;
            const boms = await bomService.getBom(_id, fUser, fCompany);
            res.status(200).json(boms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateBom: async (req, res) => {
        try {
            const _id = req.user;
            const { _idBom, idBom, _idCompany, bomName, detailBom, status } = req.body;
            if (!_idBom || !idBom || !bomName || !detailBom || status === null || !_idCompany) {
                res.status(400).json({ message: 'Missing required fields' });
                return console.log(_id, _idBom, idBom, bomName, detailBom, status, _idCompany);
            }
            await bomService.updateBom({ _id, _idBom, idBom, bomName, detailBom, status, _idCompany });
            res.status(200).json({ message: 'Bom updated' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = bomController;