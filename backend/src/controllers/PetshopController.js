const Petshop = require('../models/Petshop');
const User = require('../models/User');
const Comment = require('../models/Avaliation');
const Schedule = require('../models/Schedule');
const Service = require('../models/Service');
const sortByDistance = require('sort-by-distance')

class PetshopController{
    async register(req, res){
        const {name, cnpj, pet_categories, services_categories, companyName, photoUri, email, phone, address, latitude, longitude, username, password, days, initialTime, finalTime} = req.body;

        if(!name) return res.status(400).send({ error: 'Name is required!'});
        if(!cnpj) return res.status(400).send({ error: 'CNPJ is required!'});
        if(!companyName) return res.status(400).send({ error: 'Company name is required!'});
        if(!email) return res.status(400).send({ error: 'Email is required!'});
        if(!phone) return res.status(400).send({ error: 'Phone is required!'});
        if(!address) return res.status(400).send({ error: 'Address is required!'});
        if(!pet_categories) return res.status(400).send({ error: 'At least one category of pet is required!'});
        if(pet_categories.length === 0) return res.status(400).send({ error: 'At least one category is required!'});
        if(!services_categories) return res.status(400).send({ error: 'At least one category of services is required!'});
        if(services_categories.length === 0) return res.status(400).send({ error: 'At least one category is required!'});
        if(!latitude) return res.status(400).send({ error: 'Latitude is required!'});
        if(!longitude) return res.status(400).send({ error: 'Longitude is required!'});
        if(!username) return res.status(400).send({ error: 'Username is required!'});
        if(!password) return res.status(400).send({ error: 'Password is required!'});
        if(!days) return res.status(400).send({ error: 'Os dias de funcionamento são obrigatórios!'});
        if(!initialTime) return res.status(400).send({ error: 'O horário inicial é obrigatório!'});
        if(!finalTime) return res.status(400).send({ error: 'O horário final é obrigatório!'});

        try {
            if(await User.findOne({username}) || await Petshop.findOne({username})) return res.status(400).send({ error: 'There is another account with this username!'});
            if(await User.findOne({email}) || await Petshop.findOne({email})) return res.status(400).send({ error: 'There is another account with this email!'});
            if(await Petshop.findOne({companyName})) return res.status(400).send({ error: 'There is another Petshop with this company name!'});
            if(await Petshop.findOne({cnpj})) return res.status(400).send({ error: 'There is another Petshop with this CNPJ!'});


            //REALIZA A FUNÇÃO PARA CRIAR HORÁRIOS

            let diasDisponiveis = [];
            const activeDate = new Date();
            let datasDisponiveis = [];
            
            for(let i = 0; i <= 7; i++){
                activeDate.setDate(activeDate.getDate() + 1);
                if(days.includes(activeDate.getDay())){
                    diasDisponiveis.push(('0' + activeDate.getDate()).slice(-2) + '/' + ('0' + (activeDate.getMonth()+1)).slice(-2) + '/' + activeDate.getFullYear());
                }
            }
            
            const horaInit = Number(initialTime.split(':')[0]);
            const minutosInit = Number(initialTime.split(':')[1]);
            const horaEnd = Number(finalTime.split(':')[0]);
            let qtdDayHours = 0;
            
            diasDisponiveis.map(dia => {
                qtdDayHours = 0;
                activeDate.setHours(horaInit);
                activeDate.setMinutes(minutosInit);

                for(let i = horaInit; i <= horaEnd; i++){
                    for(let j = 0; j<= 1; j++){
                        qtdDayHours++;
                        if(j === 0){
                            datasDisponiveis.push({
                                date: dia,
                                hour: ('0' + i).slice(-2) + ':' + '00',
                                status: true
                            });
                        } else {
                            if(i === horaEnd){
                                return;
                            }
                            datasDisponiveis.push({
                                date: dia,
                                hour: ('0' + i).slice(-2) + ':' + '30',
                                status: true
                            });
                        }
                    }
                }
            })

            //REALIZA A FUNÇÃO PARA CRIAR HORÁRIOS

            const petshop = await Petshop.create({
                name,
                cnpj,
                companyName,
                pet_categories,
                services_categories,
                photoUri,
                email,
                phone,
                address,
                latitude,
                longitude,
                availableHours: datasDisponiveis,
                qtdDayHours,
                initialTime,
                finalTime,
                days,
                username,
                password
            });
            petshop.password = undefined;
            return res.send({ petshop });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Registration failed'})
        }
    }

    async update(req, res){
        try {
            const petshop = await Petshop.findByIdAndUpdate(req.params.petshopId, req.body, {new: true});
            return res.send({ petshop });
        } catch (err) {
            return res.status(400).send({error: 'Error updating petshop'});
        }
    }

    async delete(req, res){
        try {
            await Service.deleteMany({petshopId: req.params.petshopId});
            await Comment.deleteMany({petshopId: req.params.petshopId});
            await Schedule.deleteMany({petshopId: req.params.petshopId});
            await Petshop.findByIdAndRemove(req.params.petshopId);
            return res.send({message: "Petshop deleted!"});
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Error deleting petshop'});
        }
    }

    async list(req, res){
        const {ltd, lgn, filter} = req.query;

        const origin = {
            longitude: lgn,
            latitude: ltd
        }

        const opts = {
            yName: 'latitude',
            xName: 'longitude'
        }

        let petshops;
        
        try{
            if(filter){
                petshops = await Petshop.find({"pet_categories": {$in: filter}}).limit(10).sort();
            } else {
                petshops = await Petshop.find().limit(10).sort();
            }

            const nearbyPetshops = sortByDistance(origin, petshops, opts);
            return res.send({ nearbyPetshops });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error loading petshops'});
        }
    }

    async listOne(req, res){        
        try{
            const petshop = await Petshop.findOne({_id: req.params.petshopId}).select('+availableHours');
            return res.send({ petshop });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error searching petshop'});
        }
    }
    
    async search(req, res){
        const key = req.query.key || null
    
        if(!key){
            return res.status(422).send({errors: ['Search key not provided.']})
        }
    
        try{
            const petshops = await Petshop.find({ $or: [{ "name": { $regex: key, $options: "i" }}]}).limit(10)

            return res.status(200).json(petshops)
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error searching petshops'});
        }
    }
}

module.exports = PetshopController;