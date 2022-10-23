import controller from '../controllers/usersController'

export default (app) => {
    app.post('/signup', controller.signUp)
    app.post('/login', controller.login)
}