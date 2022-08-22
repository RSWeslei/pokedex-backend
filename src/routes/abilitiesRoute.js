import controller from '../controllers/abilitiesController'

export default (app) => {
    app.get('/abilities', controller.get)
}

