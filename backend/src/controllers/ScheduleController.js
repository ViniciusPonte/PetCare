const User = require('../models/User');
const Service = require('../models/Service');
const Schedule = require('../models/Schedule');
const Petshop = require('../models/Petshop');
const Pet = require('../models/Pet');
const Patient = require('../models/Patient');

class ScheduleController{
    async create(req, res){
        const {userId, petshopId, petId, serviceId, date, time} = req.body;

        try {
            if (!userId) return res.status(400).send({ error: 'User ID required!'});
            if (!petshopId) return res.status(400).send({ error: 'Petshop ID required!'});
            if (!petId) return res.status(400).send({ error: 'Pet ID required!'});
            if (!serviceId) return res.status(400).send({ error: 'Service ID required!'});
            if (!date) return res.status(400).send({ error: 'Date required!'});
            if (!time) return res.status(400).send({ error: 'Time required!'});

            const user = await User.findOne({_id: userId});
            if(!user) return res.status(400).send({ error: 'User not found!'});

            const petshop = await Petshop.findOne({_id: petshopId});
            if(!petshop) return res.status(400).send({ error: 'Petshop not found!'});

            const pet = await Pet.findOne({_id: petId});
            if(!pet) return res.status(400).send({ error: 'Pet not found!'});

            const service = await Service.findOne({_id: serviceId});
            if(!service) return res.status(400).send({ error: 'Service not found!'});

            const scheduleAlreadyExists = await Schedule.findOne({petshop: petshop, service: service, date: date, time: time});
            if(scheduleAlreadyExists) return res.status(400).send({ error: 'There´s another schedule for this day and hourl!'});

            const schedule = await Schedule.create({
                user,
                petshop,
                pet,
                service,
                date,
                time
            });

            const aux = date.split('-');
            const formattedDate = aux[2] + '/' + aux[1] + '/' + aux[0];

            await Petshop.findOneAndUpdate(
                {_id: petshopId},
                {$set: {"availableHours.$[el].status": false } },
                { 
                  arrayFilters: [
                      { 
                        "el.date": formattedDate,
                        "el.hour": time
                      },
                  ],
                  new: true
                }
              )

              const petAlreadyExistsInPetshop = await Patient.findOne({petshop: petshopId, pet: petId});

              if(!petAlreadyExistsInPetshop){
                  await Patient.create({
                      user: userId,
                      petshop: petshopId,
                      pet: petId,
                  })
              }

            return res.send(schedule);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error creating schedule'});
        }
    }

    async update(req, res){
        const {olderDate, olderHour, newDate, newHour, petshopId, scheduleId} = req.body;

        try{

            await Schedule.findOneAndUpdate(
                {_id: scheduleId},
                {$set: {
                    "date": newDate,
                    "time": newHour,
                }}
            )


            const auxOlderDate = olderDate.split('T');
            const auxOlderDate2 = auxOlderDate[0].split('-');
            const formattedOlderDate = auxOlderDate2[2] + '/' + auxOlderDate2[1] + '/' + auxOlderDate2[0];
    
            await Petshop.findOneAndUpdate(
                {_id: petshopId},
                {$set: {"availableHours.$[el].status": true } },
                { 
                    arrayFilters: [
                        { 
                        "el.date": formattedOlderDate,
                        "el.hour": olderHour
                        },
                    ],
                    new: true
                }
            )

            const auxNewDate = newDate.split('-');
            const formattedNewDate = auxNewDate[2] + '/' +  auxNewDate[1] + '/' + auxNewDate[0];
    
            await Petshop.findOneAndUpdate(
                {_id: petshopId},
                {$set: {"availableHours.$[el].status": false } },
                { 
                    arrayFilters: [
                        { 
                        "el.date": formattedNewDate,
                        "el.hour": newHour
                        },
                    ],
                    new: true
                }
            )
            res.status(200).send("Atualizado com sucesso!")
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro ao remarcar agendamento'});
        }
    }

    async list_users(req, res){
        var activeDate = new Date();
        activeDate.setDate(activeDate.getDate() - 1);

        try {
            const schedules = await Schedule.find({"user": req.params.userId, "date": { $gte: activeDate }})
            .populate({path: 'petshop', select: ['name', 'phone']})
            .populate({path: 'service', select: 'name'})
            .populate({path: 'pet', select: 'name'})
            .sort('date')
            .limit(10);
            return res.send(schedules);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error loading schedules'});
        }
    }

    async list_petshops(req, res){
        var activeDate = new Date();
        activeDate.setDate(activeDate.getDate());

        try {
            const schedules = await Schedule.find({"petshop": req.params.petshopId, "date": { $gte: activeDate }})
            .populate({path: 'user', select: ['name', 'phone']})
            .populate({path: 'service', select: 'name'})
            .populate({path: 'pet', select: 'name'})
            .sort('date');
            return res.send(schedules);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error loading schedules'});
        }
    }

    async delete(req, res){
        const schedule_id = req.params.scheduleId;

        try {
            await Schedule.findByIdAndRemove(schedule_id);
            return res.send({ message: "Schedule deleted!" });
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Error deleting schedule'});
        }
    }
}

module.exports = ScheduleController;