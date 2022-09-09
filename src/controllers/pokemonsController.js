import Pokemon from "../sequelize/models/Pokemon";
import PokemonType from "../sequelize/models/PokemonType";
import Stat from "../sequelize/models/Stat";
import Type from "../sequelize/models/Type";

const get = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            // get only the first 20 pokemons
            let response = await Pokemon.findAll({
                limit: 100
            })
            let pokemons = JSON.parse(JSON.stringify(response))
            let i = 0
            for (let pokemon of response) {
                let types = await pokemon.getTypes()
                pokemons[i].types = types
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