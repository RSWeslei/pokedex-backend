import Favorite from "../sequelize/models/Favorite";
import User from "../sequelize/models/User";
import tokenValidator from "../middlewares/tokenValidator";

const getByUser = async (req, res) => {
    try {
        const user = await tokenValidator.getUserByToken(req.headers.authorization)

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
        let pokemons = []
        for (const favorite of response) {
            let pokemon = await favorite.getPokemon({
                attributes: ['id', 'name', 'images'],
                order: [
                    ['id', 'ASC']
                ],
            }
            )
            pokemons.push(pokemon)
        }
        let pokemonsJson = JSON.parse(JSON.stringify(pokemons))

        let i = 0
        for (const pokemon of pokemons) {
            let types = await pokemon.getTypes({
                attributes: ['id', 'name', 'color']
            })
            pokemonsJson[i].types = types
            delete pokemonsJson[i].images.animated
            i++
        }
        return res.status(200).send({
            type: 'sucess',
            message: 'Pokemons favoritos recuperados com sucesso',
            data: pokemonsJson
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
        const { idPokemon } = req.body;
        const user = await tokenValidator.getUserByToken(req.headers.authorization)
        if (!user) {
            return res.status(404).send({
                type: 'error',
                message: 'Usuario nao encontrado',
                data: null
            })
        }
        let favorite = await Favorite.findOne({
            where: {
                idUser: user.id,
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
        let response = await Favorite.create({
            idUser: user.id,
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
        let { idFavorite } = req.params;
        const user = await tokenValidator.getUserByToken(req.headers.authorization)
        if (!user) {
            return res.status(404).send({
                type: 'error',
                message: 'Usuario nao encontrado',
                data: null
            })
        }
           
        let favorite = await Favorite.findOne({
            where: {
                id: idFavorite,
                idUser: user.id
            }
        })

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
        let { idFavorite, idPokemon } = req.body;
        const user = await tokenValidator.getUserByToken(req.headers.authorization)
        if (!user) {
            return res.status(404).send({
                type: 'error',
                message: 'Usuario nao encontrado',
                data: null
            })
        }
        let favorite = await Favorite.findOne({
            where: {
                id: idFavorite,
                idUser: user.id
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