const Patient = require("../models/Patient");

class PatientController {
    async list(req, res){
        const petshop_id = req.params.petshopId;

        try {
            const patients = await Patient.find({"petshop": petshop_id})
            .populate({path: 'pet', select: ['name', 'file', 'type', 'age', 'gender']})
            .populate({path: 'user', select: ['name', 'phone']});
            return res.send(patients);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro ao carregar pacientes'});
        }
    }
    
    async delete(req, res){
        const id = req.params.patientId;

        try {
            await Patient.findByIdAndRemove({_id: id});
            return res.send({ message: "Paciente deletado!" });
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Erro ao deletar paciente'});
        }
    }
}

module.exports = PatientController;