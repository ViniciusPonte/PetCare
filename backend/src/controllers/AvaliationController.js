const Avaliation = require("../models/Avaliation");
const Patient = require("../models/Patient");
const Petshop = require("../models/Petshop");
const User = require("../models/User");

class AvaliationController {
    async create(req, res){
        const {userId, petshopId, rate, comment} = req.body;

        if(!userId) return res.status(400).send({ error: 'User ID é obrigatório'});
        if(!petshopId) return res.status(400).send({ error: 'Petshop ID é obrigatório'});
        if(!rate) return res.status(400).send({ error: 'A avaliação é necessária!'});
        const date = new Date()

        if(rate < 1 || rate > 5) return res.status(400).send({ error: 'A avaliação deve estar entre 0 e 5!'});

        try {
            const user = await User.findOne({_id: userId});
            if(!user) return res.status(400).send({ error: 'Usuário não encontrado!'});

            const petshop = await Petshop.findOne({_id: petshopId});
            if(!petshop) return res.status(400).send({ error: 'Petshop não encontrado!'});

            const alreadyRated = await Avaliation.findOne({userId: userId, petshopId: petshopId});

            if(alreadyRated){
                return res.status(400).send({ error: 'Já temos a avaliação deste usuário para este petshop!' });
            } else {
                const newAvaliation = await Avaliation.create({
                    userId,
                    petshopId,
                    rate,
                    comment,
                    date
                });

                return res.send(newAvaliation)
            }

        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Criação da avaliação falhou. Tente novamente.'});
        }
    }

    async list(req, res){
        const petshop_id = req.params.petshopId;
        const user_id = req.params.userId || null;
        let sum = 0;
        let average;
        let userAlreadyRated = false;

        try {
            const avaliations = await Avaliation.find({"petshopId": petshop_id})
            .sort('-date')
            .populate({path: 'userId', select: ['name']});

            if(user_id){
                const userRate = await Avaliation.find({"petshopId": petshop_id, "userId": user_id});
                if(userRate.length !== 0) userAlreadyRated = true
            }

            avaliations.map(avaliation => {
                if(avaliation.rate !== 0){
                    sum += avaliation.rate;
                }
                return;
            });
            average = sum/avaliations.length;

            return res.send({avaliations, average, total: avaliations.length, userAlreadyRated});
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro ao carregar avaliações'});
        }
    }
    
    async delete(req, res){
        const id = req.params.avaliationId;

        try {
            await Avaliation.findByIdAndRemove({_id: id});
            return res.send({ message: "Avaliação deletada!" });
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Erro ao deletar avaliação'});
        }
    }
}

module.exports = AvaliationController;