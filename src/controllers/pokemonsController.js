import Pokemon from "../sequelize/models/Pokemon";
import PokemonType from "../sequelize/models/PokemonType";

const get = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            let response = await Pokemon.findAll()
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
                data: response
            })
        }
        let response = await Pokemon.findOne({
            where: {
                id: id
            }
        })

        let pokemonTypes = await PokemonType.findAll({
            where: {
                idPokemon: id
            }
        })
        let pokemon = response
        let type = await pokemon.getTypes()

        // let types = await pokemonType.getPokemons()
        return res.status(200).send({
            type: 'sucess',
            message: 'Pokemons recuperados com sucesso',
            types: type
        })
        
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
    get
}