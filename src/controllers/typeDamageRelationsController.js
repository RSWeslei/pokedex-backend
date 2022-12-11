import Type from "../sequelize/models/Type"
import TypeDamageRelation from "../sequelize/models/TypeDamageRelation"

const getByPokemon = async (req, res) => {
    try {
        let {types} = req.body
        let resistances = []
        for (const type of types) {
            let response = await TypeDamageRelation.findOne({
                where: {
                    idType: type
                }
            })

            let doubleDamageFrom = response.doubleDamageFrom
            let halfDamageFrom = response.halfDamageFrom

            for (const idType of doubleDamageFrom) {
                let index = resistances.findIndex(resistance => resistance.idType === idType)
                if (index === -1) {
                    resistances.push({idType: idType, value: 2})
                } else {
                    resistances[index].value *= 2
                }
            }
            for (const idType of halfDamageFrom) {
                let index = resistances.findIndex(resistance => resistance.idType === idType)
                if (index === -1) {
                    resistances.push({idType: idType, value: 0.5})
                } else {
                    resistances[index].value *= 0.5
                }
            }
            resistances = resistances.filter(resistance => resistance.value !== 1)
            for (const resistance of resistances) {
                let type = await Type.findOne({
                    where: {
                        id: resistance.idType
                    }
                })
                resistance.name = type.name
            }
        }
        return res.status(200).send({
            type: 'success',
            message: 'Tipos de resistencia recuperados com sucesso',
            data: resistances
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: null
        })
    }
}

const getBy = async (types) => {
    try {
        let resistances = []
        for (const type of types) {
            let response = await TypeDamageRelation.findOne({
                where: {
                    idType: type
                }
            })

            let doubleDamageFrom = response.doubleDamageFrom
            let halfDamageFrom = response.halfDamageFrom
            let noDamageFrom = response.noDamageFrom

            for (const idType of doubleDamageFrom) {
                let index = resistances.findIndex(resistance => resistance.idType === idType)
                if (index === -1) {
                    resistances.push({idType: idType, value: 2})
                } else {
                    resistances[index].value *= 2
                }
            }
            for (const idType of halfDamageFrom) {
                let index = resistances.findIndex(resistance => resistance.idType === idType)
                if (index === -1) {
                    resistances.push({idType: idType, value: 0.5})
                } else {
                    resistances[index].value *= 0.5
                }
            }
            for (const noDamage of noDamageFrom) {
                let index = resistances.findIndex(resistance => resistance.idType === noDamage)
                if (index === -1) {
                    resistances.push({idType: noDamage, value: 0})
                } else {
                    resistances[index].value = 0
                }
            }
            resistances = resistances.filter(resistance => resistance.value !== 1)
            for (const resistance of resistances) {
                let type = await Type.findOne({
                    where: {
                        id: resistance.idType
                    }
                })
                resistance.name = type.name
            }
        }
        return resistances
    } catch (error) {
        return null
    }
}

export default {
    getByPokemon,
    getBy
}