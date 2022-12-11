
import User from "../sequelize/models/User"
import jwt from "jsonwebtoken";

const validateUser = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).send({
                type: 'error',
                message: 'Informe um token',
                data: []
            })
        }
        
        token = token.replace('Bearer ', '')

        const tokenDecoded = jwt.decode(token)

        if (!tokenDecoded) {
            return res.status(401).send({
                type: 'error',
                message: 'Token invalido',
                data: []
            })
        }

        const { exp } = tokenDecoded

        if (exp < (new Date().getTime() + 1) / 1000) {
            return res.status(401).send({
                type: 'error',
                message: 'Token expirado',
                data: []
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.status(401).send({
                    type: 'error',
                    message: 'Token invalido',
                    data: []
                })
            }
            next()
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: []
        })
    }
}

const getUserByToken = async (token) => {
    try {
        token = token.replace('Bearer ', '')

        const tokenDecoded = jwt.decode(token)

        const { idUser } = tokenDecoded

        if (!idUser) {
            return null
        }

        let user = await User.findOne({
            where: {
                id: idUser
            }
        })

        if (!user) {
            return null
        }

        return user
    } catch (error) {
        return null
    }
}

export default {
    validateUser,
    getUserByToken
}