const User = require('../models/User');
const Adoption = require('../models/Adoption');
const sortByDistance = require('sort-by-distance');

class AdoptionController {
    async create(req, res){
        const {userId, title, type, phone, age, latitude, longitude, city, state, gender, photo} = req.body;

        try {
            if (!title) return res.status(400).send({ error: 'Preencha o título do anúncio!'});
            if (!type) return res.status(400).send({ error: 'Tipo do pet é necessário!'});
            if (!age) return res.status(400).send({ error: 'Idade do pet é necessária!'});
            if (!gender) return res.status(400).send({ error: 'Gênero do pet é necessário!'});
            if (!photo) return res.status(400).send({ error: 'É necessária a foto de um pet!'});

            if (!userId) return res.status(400).send({ error: 'Erro ao pegar o ID do usuário!'});
            if (!phone) return res.status(400).send({ error: 'Erro ao pegar o telefone do usuário!'});
            if (!latitude) return res.status(400).send({ error: 'Erro ao pegar a latitude do usuário!'});
            if (!longitude) return res.status(400).send({ error: 'Erro ao pegar a longitude do usuário!'});
            if (!city) return res.status(400).send({ error: 'Erro ao pegar a cidade do usuário!'});
            if (!state) return res.status(400).send({ error: 'Erro ao pegar o estado do usuário!'});

            const adoption = await Adoption.create({
                userId,
                phone,
                latitude,
                longitude,
                city,
                state,
                title,
                type,
                age,
                gender,
                photo
            });

            return res.send(adoption);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro na criação do anúncio'});
        }
    }

    async list(req, res){
        const {ltd, lgn} = req.query;

        let genderFilter = req.query.genderFilter || null;
        let typeFilter = req.query.typeFilter || null;

        const origin = {
            longitude: lgn,
            latitude: ltd
        }

        const opts = {
            yName: 'latitude',
            xName: 'longitude'
        }

        let adoptions;
        
        try{
            if(genderFilter && typeFilter){
                adoptions = await Adoption.find({$and:[{"type": {$in: typeFilter}}, {"gender": {$in: genderFilter}}]}).limit(10).sort();
            } else if(genderFilter || typeFilter){
                adoptions = await Adoption.find({$or:[{"type": {$in: typeFilter}}, {"gender": {$in: genderFilter}}]}).limit(10).sort();
            } else {
                adoptions = await Adoption.find().limit(10).sort();
            }

            const nearbyAdoptions = sortByDistance(origin, adoptions, opts);
            return res.send(nearbyAdoptions);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro ao carregar anúncios'});
        }
    }

    async delete(req, res){
        try {
            await Adoption.findByIdAndRemove(req.params.adoptionId);
            return res.send({message: "Anúncio deletado com sucesso!"});
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Erro ao deletar anúncio'});
        }
    }

    async listUserAnnouncements(req, res){
        try{
            let adoptions = await Adoption.find({userId: req.params.userId}).sort();
            return res.send(adoptions);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro ao carregar anúncios'});
        }
    }
}


module.exports = AdoptionController;