const Patient = require('../models/Patient');
const Pet = require('../models/Pet');
const User = require('../models/User');

class PetController {
    async create(req, res){
        const {userId, name, type, gender, age, breed, color, port, photoUri} = req.body;

        try {
            if (!userId) return res.status(400).send({ error: 'User ID is required!'});
            if (!name) return res.status(400).send({ error: 'Name is required!'});
            if (!type) return res.status(400).send({ error: 'Type is required!'});
            if (!gender) return res.status(400).send({ error: 'Gender is required!'});
            if (!age) return res.status(400).send({ error: 'Age is required!'});
            if (!breed) return res.status(400).send({ error: 'Breed is required!'});
            if (!color) return res.status(400).send({ error: 'Color is required!'});
            if (!port) return res.status(400).send({ error: 'Port is required!'});

            const user = await User.findOne({_id: userId});
            if(!user) return res.status(400).send({ error: 'User not found!'});

            const petExist = await Pet.findOne({"userId": userId, "name": name});
            if(petExist) return res.status(400).send({ error: 'This pet already exists!'});

            const pet = await Pet.create({
                userId,
                name,
                type,
                gender,
                age,
                breed,
                color,
                photoUri
            });

            return res.send({ pet });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Pet creation failed'});
        }
    }

    async update(req, res){        
        try {
            const pet = await Pet.findByIdAndUpdate(req.params.petId, {...req.body}, {new: true});
            return res.send(pet);
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Erro ao atualizar o pet.'});
        }
    }

    async list(req, res){
        const {userId} = req.params;

        if (!userId) return res.status(400).send({ error: 'ID do usuário é necessário!'});

        const pets = await Pet.find({userId: userId});

        return res.send(pets);
    }

    async delete(req, res){
        const id = req.params.petId;

        try {
            await Pet.findByIdAndRemove({_id: id});
            await Patient.deleteMany({pet: id});
            return res.send({ message: "Pet deletado!" });
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Erro ao deletar pet'});
        }
    }
}


module.exports = PetController;