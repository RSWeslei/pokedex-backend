import controller from '../controllers/pokemonsController'

export default (app) => {
    app.get('/pokemons', controller.get)
    app.get('/pokemons-home', controller.getAll)
    app.get('/pokemons/:id', controller.getById)
}

