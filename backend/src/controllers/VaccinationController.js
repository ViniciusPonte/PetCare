const Pet = require("../models/Pet");
const Vaccination = require("../models/Vaccination");

class VaccinationController {
    async create(req, res){
        const {petId, name, date, revaccination} = req.body;

        try {
            if (!petId) return res.status(400).send({ error: 'Erro ao pegar o ID do pet!'});
            if (!name) return res.status(400).send({ error: 'Nome da vacina é necessário!'});
            if (!date) return res.status(400).send({ error: 'Data da vacina é necessário!'});
            if (!revaccination) return res.status(400).send({ error: 'Data da revacina é necessária!'});

            const pet = await Pet.findOne({_id: petId});
            if(!pet) return res.status(400).send({ error: 'Pet não encontrado!'});

            const vaccine = await Vaccination.create({
                petId,
                name,
                date,
                revaccination
            });

            return res.send(vaccine);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro no registro da vacina. Tente novamente mais tarde.'});
        }
    }

    async list(req, res){
        const pet_id = req.params.petId;

        try {
            const vaccines = await Vaccination.find({"petId": pet_id}).sort({revaccination: 'asc'});
            return res.send(vaccines);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error loading services'});
        }
    }
}


module.exports = VaccinationController;