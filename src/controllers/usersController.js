import User from "../sequelize/models/User";
import bcrypt from 'bcrypt'
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).send({
                type: 'error',
                message: 'Dados invalidos',
                data: []
            })
        }
        let emailExists = await User.findOne({
            where: {
                email: email
            }
        })
        let userExists = await User.findOne({
            where: {
                username: username
            }
        })

        let message = userExists ? 'Este nome de usuario ja esta em uso' : 'Email ja esta em uso'
        if (userExists || emailExists) {
            return res.status(500).send({
                type: 'error',
                message: message,
                data: []
            })
        }

        let salt = await bcrypt.genSalt(10)
        let passwordHash = await bcrypt.hash(password, salt)

        await User.create({
            username: username,
            email: email,
            passwordHash: passwordHash
        })

        return res.status(200).send({
            type: 'sucess',
            message: 'Usuario criado com sucesso',
            data: []
        })
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: error.message,
            data: []
        })
    }
}

const login = async (req, res) => {
    try {
        let { username, email, password } = req.body
        if ((!username && !email) || !password) {
            return res.status(400).send({
                type: 'error',
                message: 'Dados invalidos',
                data: []
            })
        }

        let user = null
        if (username) {
            user = await User.findOne({
                where: {
                    username: username
                }
            })
        } else {
            user = await User.findOne({
                where: {
                    email: email
                }
            })
        }

        if (!user) {
            return res.status(500).send({
                type: 'error',
                message: 'Usuario nao encontrado',
                data: []
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash)
        if (!passwordMatch) {
            return res.status(500).send({
                type: 'error',
                message: 'Senha incorreta',
                data: []
            })
        }

        let token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );

        user.token = token
        user.save()

        return res.status(200).send({
            type: 'sucess',
            message: 'Login realizado com sucesso',
            data: {
                token: token
            }
        })

        } catch (error) {
            return res.status(500).send({
                type: 'error',
                message: error.message,
                data: []
            })
        }
    }

export default {
        signUp,
        login
    }