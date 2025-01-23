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
            const bom = await bomService.getBom();
            res.status(200).json(bom);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getDetailBom: async (req, res) => {
        try {
            const idBom = req.params.idBom;
            const detailBom = await bomService.getDetailBom(idBom);
            res.status(200).json(detailBom);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateBom: async (req, res) => {
        try {
            const { idBom, bomName, createdBy, detailBom } = req.body;
            const bom = await bomService.updateBom({ idBom, bomName, createdBy, detailBom });
            res.status(200).json(bom);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteBom: async (req, res) => {
        try {
            const idBom = req.params.idBom;
            await bomService.deleteBom(idBom);
            res.status(200).json({ message: 'Bom deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = bomController;