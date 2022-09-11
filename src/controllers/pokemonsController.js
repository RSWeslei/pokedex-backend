import Pokemon from "../sequelize/models/Pokemon";
import PokemonAbility from "../sequelize/models/PokemonAbility";
import PokemonType from "../sequelize/models/PokemonType";
import Stat from "../sequelize/models/Stat";
import Type from "../sequelize/models/Type";

const get = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            // get only the first 20 pokemons
            let response = await Pokemon.findAll({
                limit: 20
            })
            let pokemons = JSON.parse(JSON.stringify(response))
            let i = 0
            for (let pokemon of response) {
                let types = await pokemon.getTypes()
                types.forEach(type => delete type.dataValues.pokemon_types)
                let abilities = await pokemon.getAbilities()
                let abilitiesJson = JSON.parse(JSON.stringify(abilities))
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

                pokemons[i].types = types
                pokemons[i].abilities = abilitiesJson
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
                type: 'sucess',
                message: 'Pokemons recuperados com sucesso',
                data: pokemons
            })
        }
        let response = await Pokemon.findOne({
            where: {
                id: id
            }
        })
        let pokemon = JSON.parse(JSON.stringify(response))
        let types = await response.getTypes()
        pokemon.types = types
        if (!response) {
            return res.status(500).send({
                type: 'error',
                message: 'Não foi possível encontrar o pokemon',
                data: null
            })
        }
        return res.status(200).send({
            type: 'sucess',
            message: 'Pokemon recuperado com sucesso',
            data: pokemon
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: null
        })
    }
}

export default {
    get
}