import Pokemon from "../sequelize/models/Pokemon";
import Favorite from "../sequelize/models/Favorite";
import typeDamageRelationsController from "./typeDamageRelationsController";
import tokenValidator from "../middlewares/tokenValidator";

const getAll = async (req, res) => {
    try {
        const user = await tokenValidator.getUserByToken(req.headers.authorization)
        
        let response = await Pokemon.findAll({
            limit: 20,
            attributes: ['id', 'name', 'images'],
            order: [
                ['id', 'ASC']
            ]
        })
        let pokemons = JSON.parse(JSON.stringify(response))
        let i = 0
        for (let pokemon of response) {
            if (user) {
                let favorite = await Favorite.findOne({
                    where: {
                        idUser: user.id,
                        idPokemon: pokemon.id
                    }
                })
                if (favorite) {
                    pokemons[i].isFavorite = true
                } else {
                    pokemons[i].isFavorite = false
                }
            }
            let types = await pokemon.getTypes({
                attributes: ['id', 'name', 'color']
            })
            pokemons[i].types = types
            delete pokemons[i].images.animated
            i++
        }
        if (!response) {
            return res.status(500).send({
                type: 'error',
                message: 'Não foi possível encontrar os pokemons',
                data: null
            })
        }
        return res.status(200).send({
            type: 'success',
            message: 'Pokemons recuperados com sucesso',
            data: pokemons
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: null
        })
    }
}

const getById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await tokenValidator.getUserByToken(req.headers.authorization)
        let response = await Pokemon.findOne({
            where: {
                id: id
            },
            include: ['stat']
        })
        let evolution = await response.getEvolution()
        let pokemon = JSON.parse(JSON.stringify(response))
        let types = await response.getTypes()
        types.forEach(type => delete type.dataValues.pokemon_types)
        let abilities = await response.getAbilities()
        let abilitiesJson = JSON.parse(JSON.stringify(abilities))
        if (user) {
            let favorite = await Favorite.findOne({
                where: {
                    idUser: user.id,
                    idPokemon: pokemon.id
                }
            })
            if (favorite) {
                pokemon.isFavorite = true
            } else {
                pokemon.isFavorite = false
            }
        }
        for (const ability of abilitiesJson) {
            let isHidden =  ability.pokemon_abilities.isHidden
            ability.pokemon_abilities = undefined
            ability.isHidden = isHidden
        }

        abilitiesJson.sort((a, b) => {
            if (a.isHidden && !b.isHidden) {
                return 1
            }
            if (!a.isHidden && b.isHidden) {
                return -1
            }
            return 0
        })
        let typesId = types.map(type => type.id)
        let damageRelation = await typeDamageRelationsController.getBy(typesId)
        pokemon.types = types
        pokemon.abilities = abilitiesJson
        pokemon.damageRelation = damageRelation
        pokemon.evolution = await getEvolutionChain(evolution)
        return res.status(200).send({
            type: 'success',
            message: 'Pokemon recuperado com sucesso',
            data: pokemon
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: null
        })
    }
}

const getEvolutionChain = async (evolution) => {
    let firstEvolution = null
    let secondEvolution = null
    let thirdEvolution = null

    if (evolution.firstEvolution){
        firstEvolution = await Pokemon.findOne ({
            where: {
                id: evolution.firstEvolution
            },
            attributes: ['id', 'name', 'images']
        })
        delete firstEvolution.dataValues.images.animated
    }
    if (evolution.secondEvolution){
        secondEvolution = await Pokemon.findOne ({
            where: {
                id: evolution.secondEvolution
            },
            attributes: ['id', 'name', 'images']
        })
        delete secondEvolution.dataValues.images.animated
    }
    if (evolution.thirdEvolution){
        thirdEvolution = await Pokemon.findOne ({
            where: {
                id: evolution.thirdEvolution
            },
            attributes: ['id', 'name', 'images']
        })
        delete thirdEvolution.dataValues.images.animated
    }

    return {
        id: evolution.id,
        firstEvolutionLevel: evolution.firstEvolutionLevel || null,
        secondEvolutionLevel: evolution.secondEvolutionLevel || null,
        firstEvolution: firstEvolution,
        secondEvolution: secondEvolution,
        thirdEvolution: thirdEvolution
    }
}

export default {
    getAll,
    getById
}