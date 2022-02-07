const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Petshop = require('../models/Petshop');

class FavoriteController{
    async create(req, res){
        const {userId, petshopId} = req.body;

        if(!userId) return res.status(400).send({ error: 'User ID é obrigatório'});
        if(!petshopId) return res.status(400).send({ error: 'Petshop ID é obrigatório'});

        try {
            const user = await User.findOne({_id: userId});
            if(!user) return res.status(400).send({ error: 'Usuário não encontrado!'});

            const petshop = await Petshop.findOne({_id: petshopId});
            if(!petshop) return res.status(400).send({ error: 'Petshop não encontrado!'});

            const isFavorite = await Favorite.findOne({userId: userId, petshopId: petshopId});

            if(isFavorite){
                return res.status(400).send({ error: 'Este petshop já está favoritado!' });
            } else {
                const newFavorite = await Favorite.create({
                    user: userId,
                    petshop: petshopId,
                });

                return res.send(newFavorite)
            }

        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Criação de favorito falhou. Tente novamente.'});
        }
    }

    async list(req, res){
        const user_id = req.params.userId;

        try{
            const favorites = await Favorite.find({user: user_id}).populate({path: 'petshop'});
            return res.send(favorites);
        } catch {
            return res.status(400).send({ error: 'Erro ao carregar favoritos. Tente novamente.'});
        }
    }

    async delete(req, res){
        const {userId, petshopId} = req.params;

        try {
            const favorite = await Favorite.findOne({user: userId, petshop: petshopId});
            await Favorite.findByIdAndDelete(favorite._id);
            return res.send();
        } catch (err) {
            return res.status(400).send({error: 'Erro ao deletar favorito. Tente novamente.'});
        }
    }

    async isFavorite(req, res){
        const {userId, petshopId} = req.params;

        if(!userId) return res.status(400).send({ error: 'User ID é obrigatório'});
        if(!petshopId) return res.status(400).send({ error: 'Petshop ID é obrigatório'});

        try {
            const user = await User.findOne({_id: userId});
            if(!user) return res.status(400).send({ error: 'Usuário não encontrado!'});

            const petshop = await Petshop.findOne({_id: petshopId});
            if(!petshop) return res.status(400).send({ error: 'Salão não encontrado!'});

            const isFavorite = await Favorite.findOne({user: userId, petshop: petshopId});

            if(isFavorite){
                return res.send(true);
            } else {
                return res.send(false);
            }

        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Validação de favorito falhou. Tente novamente.'});
        }
    }
    
}

module.exports = FavoriteController;