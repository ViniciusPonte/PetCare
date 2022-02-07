const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../config/auth.json');
const mailer =  require('../modules/mailer');
const User = require('../models/User');
const Petshop = require('../models/Petshop');

class AuthController{
    async login(req, res){
        const {username, password} = req.body;

        if(!username) return res.status(400).send({ error: 'Usuário é necessário!'});
        if(!password) return res.status(400).send({ error: 'Senha é necessária!'});

        let type;

        let user = await User.findOne({username}).select('+password');
        type = 'user';
    
        if(!user) {
            user = await Petshop.findOne({username}).select('+password');
            type = 'petshop';
        } 

        if(!user) return res.status(400).send({error: 'Usuário não encontrado.'});
    
        if(!await bcrypt.compare(password, user.password)) return res.status(422).send({error: 'Senha inválida!'});
    
        user.password = undefined;
    
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        })
    
        res.send({user, type, token});
    }

    async forgetPassword(req, res){
        const {email} = req.body;

        try{
            if(!email) return res.status(400).send({ error: 'Email é necessário!'});

            const user = await User.findOne({email});
            
            if (!user) return res.status(400).send({error: 'Usuário não encontrado.'});
            const token = Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + ''
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            mailer.sendMail({
                to: email,
                from: 'viniciusbponte@gmail.com',
                template: 'auth/forgot-password',
                context: {token}
            }, (err) => {
                if(err) return res.status(400).send({error: 'Não é possível enviar a solicitação.'});
            })

            return res.status(200).send({message: 'Email enviado com sucesso.'});
        } catch (err) {
            console.log(err)
            res.status(400).send({error: 'Erro ao enviar o e-mail.'})
        }
    }

    async resetPassword(req, res){
        const {email, token, password} = req.body;

        try{
            const user = await User.findOne({email}).select('+passwordResetToken passwordResetExpires');
            if(!user) return res.status(400).send({error: 'Usuário não encontrado.'});
            if(token !== user.passwordResetToken) return res.status(400).send({error: 'Token inválido.'});

            const now = new Date();

            if(now > user.passwordResetExpires) return res.status(400).send({error: 'O token expirou. Gere um novo.'});

            user.password = password;

            await user.save();
            return res.status(200).send({message: 'Senha resetada!'});
        } catch (err) {
            console.log(err);
            res.status(400).send({ error: 'Não foi possível alterar a senha. Tente novamente.'});
        }
    }

    async validateToken(req, res){
        const token = req.body.token || ''
    
        jwt.verify(token, authConfig.secret, function(err, decoded) {
    
            return res.status(200).send({valid: !err})
    
        })
    }
}

module.exports = AuthController;