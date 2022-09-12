import controller from '../controllers/typeDamageRelationsController'

export default (app) => {
    app.post('/type-damages/', controller.getByPokemon)
}