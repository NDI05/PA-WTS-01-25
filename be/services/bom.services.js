const Bom = require('../models/bom/bom.model');
const DetailBom = require('../models/bom/detailBom.model');
const Material = require('../models/materials/material.model');

const bomService = {
    createBom: async ({bomName, createdBy, detailBom}) => {
        const bom = new Bom({
            bomName,
            createdBy
        });

        await bom.save();
        console.log(detailBom[0].materialName);

        for (let i = 0; i < detailBom.length; i++) {
            const addMaterial = new Material({
                idBomSchema: bom._id,
                materialName: detailBom[i].materialName,
                pcsOf: detailBom[i].pcsOf,
                createdBy: createdBy
            })

            const addNewDetailBom = new DetailBom({
                idBomSchema: bom._id,
                idMaterial: addMaterial._id,
                quantity: detailBom[i].quantity,
                pcsOf: detailBom[i].pcsOf
            })

            await addMaterial.save();
            await addNewDetailBom.save();
        }
    }
}

module.exports = bomService;