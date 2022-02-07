const Petshop = require('../models/Petshop');
const Service = require('../models/Service');

class ServiceController {
    async create(req, res){
        const {petshopId, name, type, price, category} = req.body;

        try {
            if (!petshopId) return res.status(400).send({ error: 'Petshop ID is required!'});
            if (!name) return res.status(400).send({ error: 'Name of service is required!'});
            if (!price) return res.status(400).send({ error: 'Price is required!'});
            if (!type) return res.status(400).send({ error: 'Type of pet is required!'});
            if (!category) return res.status(400).send({ error: 'Category is required!'});

            const petshop = await Petshop.findOne({_id: petshopId});
            if(!petshop) return res.status(400).send({ error: 'Petshop not found!'});

            const categoryExist = await Service.findOne({"petshopId": petshopId, "name": name});
            if(categoryExist) return res.status(400).send({ error: 'This service already exists in this petshop!'});

            const service = await Service.create({
                petshopId,
                name,
                type,
                price,
                category
            });

            return res.send({ service });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Service creation failed'});
        }
    }

    async list(req, res){
        const petshop_id = req.params.petshopId;
        const {type} = req.query;

        try {
            let services;
            if(type){
                services = await Service.find({"petshopId": petshop_id, "type": type});
            } else {
                services = await Service.find({"petshopId": petshop_id});
            }
            return res.send(services);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error loading services'});
        }
    }

    async delete(req, res){
        const service_id = req.params.serviceId;

        try {
            await Service.findByIdAndRemove(service_id);
            return res.send();
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Error deleting service'});
        }
    }
}


module.exports = ServiceController;