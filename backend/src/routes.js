const express = require('express');
const authMiddleware = require('./middlewares/auth');
const multer = require('multer');
const multerConfig = require('./config/multer')

const authRouter = express.Router();
const appRouter = express.Router();
appRouter.use(authMiddleware);

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const PetshopController = require('./controllers/PetshopController');
const ScheduleController = require('./controllers/ScheduleController');
const ServiceController = require('./controllers/ServiceController');
const PetController = require('./controllers/PetController');
const AdoptionController = require('./controllers/AdoptionController');
const VaccinationController = require('./controllers/VaccinationController');
const PatientController = require('./controllers/PatientController');
const FavoriteController = require('./controllers/FavoriteController');
const AvaliationController = require('./controllers/AvaliationController');

const authController = new AuthController();
const userController = new UserController();
const petshopController = new PetshopController();
const scheduleController = new ScheduleController();
const serviceController = new ServiceController();
const petController = new PetController();
const adoptionController = new AdoptionController();
const vaccinationController = new VaccinationController();
const patientController = new PatientController();
const favoriteController = new FavoriteController();
const avaliationController = new AvaliationController();

// AUTENTICAÇÃO
authRouter.post("/login", authController.login);
authRouter.post("/forgot", authController.forgetPassword);
authRouter.post("/reset", authController.resetPassword);
authRouter.post("/validate", authController.validateToken);

//USUARIO
authRouter.post("/user", userController.register);
appRouter.put("/user/:userId", userController.update); 
appRouter.delete("/user/:userId", userController.delete); 

//PETSHOP
authRouter.post("/petshop", petshopController.register);
appRouter.put("/petshop/:petshopId", petshopController.update); 
appRouter.delete("/petshop/:petshopId", petshopController.delete); 
appRouter.get("/petshop", petshopController.list); 
appRouter.get("/petshop_detail/:petshopId", petshopController.listOne)
appRouter.get("/search", petshopController.search);

//PACIENTES
authRouter.get("/patient/:petshopId", patientController.list);
authRouter.delete("/patient/:patientId", patientController.delete);

//AGENDAMENTOS
appRouter.post("/schedule", scheduleController.create);
appRouter.put("/schedule", scheduleController.update);
appRouter.get("/schedule/users/:userId", scheduleController.list_users);
appRouter.get("/schedule/petshops/:petshopId", scheduleController.list_petshops);
appRouter.delete("/schedule/:scheduleId", scheduleController.delete);

//SERVIÇOS
appRouter.post("/service", serviceController.create);
appRouter.get("/services/:petshopId", serviceController.list);
appRouter.delete("/service/:serviceId", serviceController.delete);

//PET
appRouter.post("/pets", petController.create);
appRouter.put("/pets/:petId", petController.update);
appRouter.get("/pets/:userId", petController.list);
appRouter.delete("/pets/:petId", petController.delete);

//ADOÇÃO
appRouter.post("/adoption", adoptionController.create);
appRouter.get("/adoptions", adoptionController.list);
appRouter.get("/adoptions/:userId", adoptionController.listUserAnnouncements);  
appRouter.delete("/adoption/:adoptionId", adoptionController.delete);

//VACINAS
appRouter.post("/vaccine", vaccinationController.create);
appRouter.get("/vaccines/:petId", vaccinationController.list);

//FAVORITOS
appRouter.post("/favorites", favoriteController.create);
appRouter.get("/favorites/:userId", favoriteController.list);
appRouter.delete("/favorites/:userId/:petshopId", favoriteController.delete);
appRouter.get("/is_favorite/:userId/:petshopId", favoriteController.isFavorite);

//AVALIAÇÃO
appRouter.post('/avaliation', avaliationController.create);
appRouter.get('/avaliation/:petshopId/:userId?', avaliationController.list);
appRouter.delete('/avaliation/:avaliationId', avaliationController.delete);

module.exports = {appRouter, authRouter}