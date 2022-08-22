import Pokemon from "../sequelize/models/Pokemon";

const get = async (req, res) => {
    try {
        let response = await Pokemon.findAll()
        res.status(200).send({
            type: 'sucess',
            message: 'Pokemons recuperados com sucesso',
            data: response
        })
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Erro ao recuperar os Pokemons',
            data: null
        })
    }
}

export default {
    get
}