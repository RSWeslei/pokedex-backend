import Ability from "../sequelize/models/Ability";
import Pokemon from "../sequelize/models/Pokemon";

const get = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            let response = await Ability.findAll()
            if (!response) {
                return res.status(500).send({
                    type: 'error',
                    message: 'Não foi possível encontrar as abilidades',
                    data: null
                })
            }
            return res.status(200).send({
                type: 'sucess',
                message: 'Abilidades recuperadas com sucesso',
                data: response
            })
        }
        let response = await Ability.findOne({
            where: {
                id: id
            }
        })
        if (!response) {
            return res.status(500).send({
                type: 'error',
                message: 'Não foi possível encontrar a abilidade',
                data: null
            })
        }
        return res.status(200).send({
            type: 'sucess',
            message: 'Abilidade recuperada com sucesso',
            data: response
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao recuperar as abilidades',
            data: null
        })
    }
}

const getByPokemon = async (req, res) => {
    try {
        let {id} = req.params;

    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao recuperar as abilidades',
            data: null
        })
    }
}

export default {
    get
}