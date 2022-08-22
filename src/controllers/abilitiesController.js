import Ability from "../sequelize/models/Ability";

const get = async (req, res) => {
    try {
        let response = await Ability.findAll()
        res.status(200).send({
            type: 'sucess',
            message: 'Abilidades recuperadas com sucesso',
            data: response
        })
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Erro ao recuperar as abilidades',
            data: null
        })
    }
}

export default {
    get
}