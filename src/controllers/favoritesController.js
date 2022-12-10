import Favorite from "../sequelize/models/Favorite";
import User from "../sequelize/models/User";

const getByUser = async (req, res) => {
    try {
        const {idUser} = req.params;
        let user = await User.findByPk(idUser)
        if (!user) {
            return res.status(404).send({
                type: 'error',
                message: 'Usuario não encontrado',
                data: null
            })
        }
        let response = await user.getFavorites()
        if (!response) {
            return res.status(500).send({
                type: 'error',
                message: 'Não foi possível encontrar os favoritos',
                data: null
            })
        }
        return res.status(200).send({
            type: 'sucess',
            message: 'Pokemons favoritos recuperados com sucesso',
            data: response
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: null
        })
    }
}

const create = async (req, res) => {
    try {
        const {idUser, idPokemon} = req.body;
        let favorite = await Favorite.findOne({
            where: {
                idUser: idUser,
                idPokemon: idPokemon
            }
        })
        if (favorite) {
            return res.status(400).send({
                type: 'error',
                message: 'Favorito com esse pokemon ja existe',
                data: null
            })
        }
        let user = await User.findByPk(idUser)
        if (!user) {
            return res.status(404).send({
                type: 'error',
                message: 'Usuario nao encontrado',
                data: null
            })
        }
        let response = await Favorite.create({
            idUser: idUser,
            idPokemon: idPokemon
        })
        if (!response) {
            return res.status(500).send({
                type: 'error',
                message: 'Não foi possível criar o favorito',
                data: null
            })
        }
        return res.status(200).send({
            type: 'sucess',
            message: 'Favorito criado com sucesso',
            data: response
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: null
        })
    }
}

const remove = async (req, res) => {
    try {
        let {idFavorite} = req.params;
        let favorite = await Favorite.findByPk(idFavorite)
        if (!favorite) {
            return res.status(404).send({
                type: 'error',
                message: 'Favorito nao encontrado',
                data: null
            })
        }
        let response = await favorite.destroy()
        if (!response) {
            return res.status(500).send({
                type: 'error',
                message: 'Não foi possível deletar o favorito',
                data: null
            })
        }
        return res.status(200).send({
            type: 'sucess',
            message: 'Favorito deletado com sucesso',
            data: response
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: null
        })
    }
}

const update = async (req, res) => {
    try {
        let {idFavorite, idUser, idPokemon} = req.body;
        let favorite = await Favorite.findOne({
            where: {
                id: idFavorite,
                idUser: idUser
            }
        })
        if (!favorite) {
            return res.status(404).send({
                type: 'error',
                message: 'Favorito nao encontrado',
                data: null
            })
        }
        let response = await favorite.update({
            idPokemon: idPokemon
        })
        if (!response) {
            return res.status(500).send({
                type: 'error',
                message: 'Nao foi possível atualizar o favorito',
                data: null
            })
        }
        return res.status(200).send({
            type: 'sucess',
            message: 'Favorito atualizado com sucesso',
            data: response
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: null
        })
    }
}

export default {
    getByUser,
    create,
    remove,
    update
}