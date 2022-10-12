import controller from '../controllers/pokemonsController'

export default (app) => {
    app.get('/pokemons', controller.getAll)
    app.get('/pokemons/:id', controller.getById)
}

