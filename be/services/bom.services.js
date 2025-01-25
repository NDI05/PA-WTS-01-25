const Bom = require('../models/bom/bom.model');
const DetailBom = require('../models/bom/detailBom.model');
const Material = require('../models/materials/material.model');
const detailEntrepreneur = require('../models/users/detailEntrepreneur.model');

const bomService = {
    createBom: async ({bomName, createdBy, detailBom}) => {
        const idCompany = await detailEntrepreneur.findOne({idUser: createdBy});

        const bom = new Bom({
            bomName,
            createdBy,
            idCompany: idCompany._id
        });

        await bom.save();

        for (let i = 0; i < detailBom.length; i++) {
            // const addMaterial = new Material({
            //     idBomSchema: bom._id,
            //     materialName: detailBom[i].materialName,
            //     pcsOf: detailBom[i].pcsOf,
            //     createdBy: createdBy
            // })
            const addNewDetailBom = new DetailBom({
                idBomSchema: bom._id,
                // idMaterial: addMaterial._id,
                quantity: detailBom[i].quantity,
                pcsOf: detailBom[i].pcsOf
            })

            // await addMaterial.save();
            await addNewDetailBom.save();
        }
    },
    getBom: async (_id) => {
        const idCompany = await detailEntrepreneur.findOne({idUser: _id});
        const boms = await Bom.find({idCompany: idCompany._id});
        return boms;
    },
    getDetailBom: async (idBomSchema) => {
        const detailBoms = await DetailBom.find({idBomSchema});
        return detailBoms;
    }
}

module.exports = bomService;