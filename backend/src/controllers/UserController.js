const Avaliation = require('../models/Avaliation');
const Favorite = require('../models/Favorite');
const Schedule = require('../models/Schedule');
const User = require('../models/User');

class UserController{
    async register(req, res){
        const {email, username, name, cpf, phone, password} = req.body;

        if(!email) return res.status(400).send({ error: 'Email is required!'});
        if(!username) return res.status(400).send({ error: 'Username is required!'});
        if(!name) return res.status(400).send({ error: 'Name is required!'});
        if(!cpf) return res.status(400).send({ error: 'CPF is required!'});
        if(!phone) return res.status(400).send({ error: 'Phone is required!'});
        if(!password) return res.status(400).send({ error: 'Password is required!'});

        try {
            if(await User.findOne({email})) return res.status(400).send({ error: 'There is another account with this email!'});
            if(await User.findOne({username})) return res.status(400).send({ error: 'There is another account with this username!'});
            if(await User.findOne({cpf})) return res.status(400).send({ error: 'There is another account with this CPF!'}); 
            const user = await User.create({
                name,
                email,
                cpf,
                phone,
                username,
                password
            });

            user.password = undefined;
            return res.send({ user });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Registration failed'})
        }
    }

    async update(req, res){
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, {...req.body}, {new: true});
            return res.send({ user });
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Error updating user'});
        }
    }

    async delete(req, res){
        const user_id = req.params.userId;

        try {
            await Favorite.deleteMany({user: user_id});
            await Avaliation.deleteMany({userId: user_id});
            await Schedule.deleteMany({userId: user_id});
            await User.findByIdAndRemove(user_id);
            return res.send({ message: "User deleted!" });
        } catch (err) {
            console.log(err);
            return res.status(400).send({error: 'Error deleting user'});
        }
    }

}

module.exports = UserController;