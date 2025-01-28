const Bom = require('../models/bom/bom.model');
const DetailBom = require('../models/bom/detailBom.model');
const detailEntrepreneur = require('../models/users/detailEntrepreneur.model');
const Company = require('../models/company.model');
const users = require('../models/users/users.model');

const bomService = {
    createBom: async ({idBom, bomName, _idUser, detailBom, status, _idCompany}) => {
        if (await Bom.findOne({idBom})) throw new Error('Bom is already exist');

        const user = await users.findOne({_id: _idUser});
        if (user.role === 'officer'){
            if (status === null) throw new Error('Status is required');
            if (!_idCompany) throw new Error('Company is required');
            if (!await Company.findOne({_id: _idCompany})) throw new Error('Company not found');
        }

        const entrepreneur = await detailEntrepreneur.findOne({idUser: _idUser});
        const bom = new Bom({
            idBom,
            bomName,
            _idUser,
            idCompany: entrepreneur !== null ? entrepreneur.idCompany : _idCompany,
            status
        });

        await bom.save();

        for (let i = 0; i < detailBom.length; i++) {
            const addNewDetailBom = new DetailBom({
                idBomSchema: bom._id,
                materialName: detailBom[i].materialName,
                quantity: detailBom[i].quantity,
                pcsOf: detailBom[i].pcsOf
            })

            await addNewDetailBom.save();
        }
    },

    getBom: async (_id, fUser, fCompany) => {
        const role = await users.findOne({_id});
        if (role.role === 'officer' && fCompany === "") return await Bom.find();
        if (role.role === 'officer' && fCompany !== "") return await Bom.find({idCompany: fCompany});
        if (_id && fUser === "true") return await Bom.find({_idUser: _id});
        const idCompany = await detailEntrepreneur.findOne({idUser: _id});
        return await Bom.find({idCompany: idCompany.idCompany});
    },
    
    updateBom: async ({_id, _idBom, idBom, bomName, detailBom, status, _idCompany}) => {
        const role = (await users.findOne({_id})).role;
        if (role !== 'officer'){
            throw new Error('You are not authorized to update this bom');
        }

        if (!await Bom.findOne({_id: _idBom})) throw new Error('Bom not found');

        if (!await Company.findOne({_id: _idCompany})) throw new Error('Company not found');

        await Bom.updateOne({_id: _idBom}, 
            {$set :
                {
                    idBom,
                    bomName,
                    status,
                    idCompany: _idCompany
                }
            });

        for (let i = 0; i < detailBom.length; i++) {
            if (!await DetailBom.findOne({idBomSchema: _idBom})) throw new Error('Detail not found');
            if (!detailBom[i]._id) throw new Error('Detail not found');
            await DetailBom.updateOne({_id: detailBom[i]._id}, 
                {$set :
                    {
                        materialName: detailBom[i].materialName,
                        quantity: detailBom[i].quantity,
                        pcsOf: detailBom[i].pcsOf
                    }
                });
        }
    }
}

module.exports = bomService;